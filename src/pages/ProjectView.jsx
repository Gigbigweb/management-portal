// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { projectdata } from 'src/redux/slice/project';
// import { SingleProject } from 'src/Api/Api';
// import { tr } from 'date-fns/locale';
// import Rating from 'react-rating-stars-component';
// import axios from 'axios';
// import { Url } from 'src/url/url';

// const ProjectViewPage = () => {
//     const { projectId } = useParams()
//     const packageAllData = useSelector(store => store.package.data)
//     const projectAllData = useSelector(store => store.project.data)
//     const teamAllData = useSelector(store => store.team.data)
//     const ratingAllData = useSelector(store => store.rating.data)
//     const dispatch = useDispatch()
//     const [project, setProject] = useState()
//     const [createDate, setCreateDate] = useState()
//     const [teamAtDate, setTeamAtDate] = useState()
//     const [startAtDate, setStartAtDate] = useState()
//     const [expireAtDate, setExpireAtDate] = useState()

//     const projectDetailsFunc = async () => { 
//         try {
//             const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`) 
//             setProject(response.data);
//         } catch (error) {

//         }
//         finally {

//         }
//     }

//     const getProjectFunc = async () => {
//         const response = await SingleProject(projectId); 
//         setProject(response.data);
//         const dateString = response.data.createdAt;
//         if (response.data.expireAt) {
//             const expireDateObj = new Date(response.data.expireAt);
//             setExpireAtDate(`${expireDateObj.getDate()} ${expireDateObj.toLocaleString('default', { month: 'long' })} ${expireDateObj.getFullYear()}`)
//         }

//         if (response.data.teamAt && response.data.startAt) {
//             const teamDateObj = new Date(response.data.teamAt);
//             const startDateObj = new Date(response.data.startAt);
//             setTeamAtDate(`${teamDateObj.getDate()} ${teamDateObj.toLocaleString('default', { month: 'long' })} ${teamDateObj.getFullYear()}`)
//             setStartAtDate(`${startDateObj.getDate()} ${startDateObj.toLocaleString('default', { month: 'long' })} ${startDateObj.getFullYear()}`)
//         }
//         const date = new Date(dateString);
//         const day = String(date.getDate()).padStart(2, "0");
//         const monthNames = [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//         ];
//         const month = monthNames[date.getMonth()];
//         const year = String(date.getFullYear());
//         const hours = date.getHours();
//         const minutes = String(date.getMinutes()).padStart(2, "0");
//         const timeOfDay = hours >= 12 ? "PM" : "AM";
//         const formattedHours = hours % 12 || 12;
//         const timezone = date.toString().match(/\((.+)\)/)[1];
//         setCreateDate({
//             day,
//             month,
//             year,
//             time: `${formattedHours}:${minutes} ${timeOfDay}`,
//             timezone,
//         });
//     };

//     function formatDate(dateString) {
//         if (dateString) {
//             const [year, month, day] = dateString.split('-');
//             const date = new Date(year, month - 1, day);
//             const formattedDay = date.getDate().toString().padStart(2, '0');
//             const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
//             const formattedYear = date.getFullYear().toString();

//             return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//         }
//     }

//     function formatDateFunc(inputDate) {
//         const date = new Date(inputDate);
//         const day = String(date.getDate()).padStart(2, '0');  
//         const month = String(date.getMonth() + 1).padStart(2, '0');  
//         const year = date.getFullYear();  
//         return `${day}/${month}/${year}`;
//     }

//     useEffect(() => {
//         projectDetailsFunc()
//         // getProjectFunc()
//     }, [])

//     // useEffect(()=>{
//     //   dispatch(projectdata)
//     // }, [project])


// console.log("project",project)
//     return (
//         <>
//             <ToastContainer />
//             <Helmet>
//                 <title> Project View </title>
//             </Helmet>
//                 {/* <Container>
//                     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//                         <Typography variant="h4" gutterBottom>
//                             Project
//                         </Typography>
//                     </Stack>
//                 </Container>

//                 <Container className="mb-4 ">
//                     <div className="bg-lightgray rounded-top p-3">
//                         <div className='text-end mb-3'> <span className='cl-darkblue'>Project Status :</span> {project && project.projectStatus}</div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-12">
//                                 <div>
//                                     <p>
//                                         <span className="text-capitalize cl-darkpink">
//                                             Pacakage :
//                                         </span>{" "}
//                                         <span className="text-capitalize cl-darkblue">
//                                             {packageAllData.length > 0 &&
//                                                 project &&
//                                                 project.projectType === "package" ? (
//                                                 <>
//                                                     {
//                                                         packageAllData.filter(
//                                                             (packageVal) =>
//                                                                 packageVal._id === project.packageId
//                                                         ).packageName
//                                                     }
//                                                 </>
//                                             ) : (
//                                                 <>Custom Package</>
//                                             )}
//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span className="text-capitalize cl-darkpink">
//                                             client name :
//                                         </span>{" "}
//                                         <span className="text-capitalize cl-darkblue">
//                                             {project && project.clientName}
//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span className="text-capitalize cl-darkpink">
//                                             Project Id :
//                                         </span>{" "}
//                                         <span className="text-capitalize cl-darkblue">
//                                             {project && project._id}
//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span className="text-capitalize cl-darkpink">
//                                             client id :
//                                         </span>{" "}
//                                         <span className="text-capitalize cl-darkblue">
//                                             {project && project.clientId._id}
//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span className="text-capitalize cl-darkpink">Pricing :</span>{" "}
//                                         <span className="text-capitalize cl-darkblue">
//                                             $ {project && project.totalPrice}
//                                         </span>
//                                     </p> 
                              
//                                     <p>
//                                         <span className="text-capitalize cl-darkpink">
//                                             Initiated Project :
//                                         </span>{" "}
//                                         <span className="text-capitalize cl-darkblue">{project?.startAt ?formatDateFunc(project.startAt) : null} </span>
//                                     </p>
//                                     {teamAtDate &&
//                                         <p className='d-flex align-item-cener'>
//                                             <span className="text-capitalize cl-darkpink width-max-content me-1">
//                                                 Team Alloted:
//                                             </span>{" "}
//                                             <span className="text-capitalize cl-darkblue">{teamAtDate}</span>
//                                         </p>}
//                                     {startAtDate &&
//                                         <p className='d-flex align-item-cener'>
//                                             <span className="text-capitalize cl-darkpink width-max-content me-1">
//                                                 Project Start:
//                                             </span>{" "}
//                                             <span className="text-capitalize cl-darkblue">{startAtDate} {formatDate(project.startAt)}</span>
//                                         </p>}

//                                     {expireAtDate &&
//                                         <p className='d-flex align-item-cener'>
//                                             <span className="text-capitalize cl-darkpink width-max-content me-1">
//                                                 Project Expire Date :
//                                             </span>{" "}
//                                             <span className="text-capitalize cl-darkblue">{expireAtDate} </span>
//                                         </p>}


//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-12">
//                                 <div>
//                                     <h4 className='cl-darkblue'>Services</h4>
//                                     <div className="border rounded-4 shadow p-3">
//                                         {project?.service?.map((servcieValue) => (
//                                             <div key={servcieValue.serviceId} className="border-bottom mb-2">
//                                                 <h5 className="text-capitalize d-flex align-items-center">{servcieValue.serviceName} &nbsp; &nbsp; <span className={`rounded-circle p-1 d-inline-block ${servcieValue.status === 'complete' ? 'bg-success' : 'bg-warning'}`}></span></h5>
//                                                 <small className="text-muted">{servcieValue?.serviceStart && <>{formatDate(servcieValue.serviceStart)} - {formatDate(servcieValue.serviceEnd)}</>}</small>
//                                                 <p>{servcieValue?.brief}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Container>
//                 <Container className='mb-4'>
//                     <section className='card p-3 '>
//                         {project && project.team ?
//                             <div className="table-responsive">
//                                 <table className='table'>
//                                     <thead>
//                                         <tr>
//                                             <th>Role</th>
//                                             <th>Name</th>
//                                             <th>Profile</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td className='text-capitalize'>{project.team.assistant.role}</td>
//                                             <td className='text-capitalize'>{project.team.assistant.staffName}</td>
//                                             <td><Link className='btn btn-primary'> Profile View</Link></td>
//                                         </tr>
//                                         {project.team.team?.map((teamValue, teamIndex) => {
//                                             return (
//                                                 <tr key={teamIndex}>
//                                                     <td>{teamValue.role}</td>
//                                                     <td>{teamValue.staffName}</td>
//                                                     <td><Link className='btn btn-primary'>Profile View</Link></td>
//                                                 </tr>
//                                             )
//                                         })}

//                                         {teamAllData && project && teamAllData.filter(data => data._id === project.team)?.map((teamValue, teamIndex) => {
//                                             return (
//                                                 <tr key={teamIndex}>
//                                                     <td>{teamValue.assistant.role}</td>
//                                                     <td>{teamValue.assistant.staffName}</td>
//                                                     <td><Link className='btn btn-primary'> Profile View</Link></td>
//                                                 </tr>
//                                             )
//                                         })}
//                                         {teamAllData.filter(data => data._id === project.team).team?.map((teamValue, teamIndex) => {
//                                             return (
//                                                 <tr key={teamIndex}>
//                                                     <td>{teamValue.role}</td>
//                                                     <td>{teamValue.staffName}</td>
//                                                     <td><Link className='btn btn-primary'>Profile View</Link></td>
//                                                 </tr>
//                                             )
//                                         })}

//                                     </tbody>
//                                 </table>
//                             </div>
//                             :
//                             <>
//                                 <div className="text-center">
//                                     <p> no team is assined. </p>
//                                     <Link className='btn btn-primary' to={`/dashboard/make-team/${projectId}`}>make a team</Link>
//                                 </div>
//                             </>
//                         }
//                     </section>
//                 </Container>

//                 {(ratingAllData.filter(data => data.projectId === (project && project._id)).length > 0) ?

//                     <Container className=''>
//                         <section className='card p-3 '>
//                             <h2>Rating</h2>
//                             {ratingAllData && ratingAllData.filter(data => data.projectId === (project && project._id)).map((ratingValue) => {
//                                 return (
//                                     <div key={ratingValue._id}>
//                                         <div>
//                                             <Rating
//                                                 count={5}
//                                                 value={ratingValue.ratingStar}
//                                                 size={24}
//                                                 edit={false}
//                                                 activeColor="#ff6c00"

//                                                 classNames="w-max"
//                                             />
//                                         </div>
//                                         <p>{ratingValue.ratingComment}</p>
//                                     </div>
//                                 )
//                             })}
//                         </section>
//                     </Container>
//                     : null} */}


// <Container>
//     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//         <Typography variant="h4" gutterBottom className="fw-bold text-primary">
//             Project Details
//         </Typography>
//     </Stack>
// </Container>

// <Container className="mb-4">
//     <div className="project-details-box rounded-top p-4 shadow-sm">
//         <div className='text-end mb-3 fw-medium'>
//             <span className='text-primary'>Project Status :</span> {project?.projectStatus}
//         </div>
//         <div className="row g-4">
//         <div className="col-lg-6 col-md-12">
//   <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//     <h5 className="text-primary fw-bold mb-3">
//       <i className="bi bi-folder2-open me-2"></i>Project Details
//     </h5>
//     <div className="row">
//       <div className="col-6 mb-3">
//         <small className="text-muted">Package</small>
//         <p className="mb-0 fw-semibold">{project?.projectType === "package" && packageAllData.length > 0
//             ? packageAllData.find(p => p._id === project.packageId)?.packageName
//             : "Custom Package"}</p>
//       </div>
//       <div className="col-6 mb-3">
//         <small className="text-muted">Client Name</small>
//         <p className="mb-0 fw-semibold">{project?.clientName}</p>
//       </div>
//       <div className="col-6 mb-3">
//         <small className="text-muted">Project ID</small>
//         <p className="mb-0 fw-semibold">{project?._id}</p>
//       </div>
//       <div className="col-6 mb-3">
//         <small className="text-muted">Client ID</small>
//         <p className="mb-0 fw-semibold">{project?.clientId?._id}</p>
//       </div>
//       <div className="col-6 mb-3">
//         <small className="text-muted">Pricing</small>
//         <p className="mb-0 text-success fw-bold">${project?.totalPrice}</p>
//       </div>
//       <div className="col-6 mb-3">
//         <small className="text-muted">Initiated</small>
//         <p className="mb-0 fw-semibold">{project?.startAt && formatDateFunc(project.startAt)}</p>
//       </div>

//       {teamAtDate && (
//         <div className="col-6 mb-3">
//           <small className="text-muted">Team Allotted</small>
//           <p className="mb-0">{teamAtDate}</p>
//         </div>
//       )}
//       {startAtDate && (
//         <div className="col-6 mb-3">
//           <small className="text-muted">Project Start</small>
//           <p className="mb-0">{startAtDate} {formatDate(project.startAt)}</p>
//         </div>
//       )}
//       {expireAtDate && (
//         <div className="col-6 mb-3">
//           <small className="text-muted">Expire Date</small>
//           <p className="mb-0 text-danger fw-medium">{expireAtDate}</p>
//         </div>
//       )}
//     </div>
//   </div>
// </div>

//             <div className="col-lg-6 col-md-6 col-12">
//                 <h5 className='text-primary mb-3'>Services</h5>
//                 <div className="border rounded-4 shadow-sm p-3 bg-white">
//                     {project?.service?.map((servcieValue) => (
//                         <div key={servcieValue.serviceId} className="border-bottom pb-2 mb-3">
//                             <h6 className="text-capitalize fw-bold d-flex align-items-center justify-content-between">
//                                 {servcieValue.serviceName}
//                                 <span className={`status-badge ${servcieValue.status === 'completed' ? 'bg-success' : 'bg-warning'}`}></span>
//                             </h6>
//                             <small className="text-muted">
//                                 {servcieValue?.serviceStart && `${formatDate(servcieValue.serviceStart)} - ${formatDate(servcieValue.serviceEnd)}`}
//                             </small>
//                             <p className='mb-0'>{servcieValue?.brief}</p>
//                             <p className='text-capitalize fw-bold'>freelancer price : ${servcieValue?.freelancerPrice}</p>
//                             <p className='text-capitalize fw-bold'>company Price : ${servcieValue?.price}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     </div>
// </Container>

// <Container className='mb-4'>
//     <section className='card p-4 shadow-sm'>
//         {project?.team ? (
//             <div className="table-responsive">
//                 <table className='table table-striped'>
//                     <thead className="table-light">
//                         <tr>
//                             <th>Role</th>
//                             <th>Name</th>
//                             <th>Profile</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>{project.team.assistant.role}</td>
//                             <td>{project.team.assistant.staffName}</td>
//                             <td><Link className='btn btn-sm btn-outline-primary'>Profile View</Link></td>
//                         </tr>
//                         {project.team.team?.map((teamValue, i) => (
//                             <tr key={i}>
//                                 <td>{teamValue.role}</td>
//                                 <td>{teamValue.staffName}</td>
//                                 <td><Link className='btn btn-sm btn-outline-primary'>Profile View</Link></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         ) : (
//             <div className="text-center">
//                 <p>No team is assigned.</p>
//                 <Link className='btn btn-dark' to={`/dashboard/make-team/${projectId}`}> <i className="fas fa-users me-2"></i>Make a Team</Link>
//             </div>
//         )}
//     </section>
// </Container>

// {ratingAllData?.filter(r => r.projectId === project?._id).length > 0 && (
//     <Container>
//         <section className='card p-4 shadow-sm'>
//             <h4 className="text-primary mb-3">Rating</h4>
//             {ratingAllData.filter(r => r.projectId === project._id).map((ratingValue) => (
//                 <div key={ratingValue._id} className="mb-3 border-bottom pb-3">
//                     <Rating
//                         count={5}
//                         value={ratingValue.ratingStar}
//                         size={24}
//                         edit={false}
//                         activeColor="#ff6c00"
//                     />
//                     <p className="mt-2">{ratingValue.ratingComment}</p>
//                 </div>
//             ))}
//         </section>
//     </Container>
// )}










//         </>
//     )
// }

// export default ProjectViewPage











// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ New States for Rating Modal
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Project View </title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold text-primary">
//             Project Details
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <div className="project-details-box rounded-top p-4 shadow-sm">
//           <div className="text-end mb-3 fw-medium">
//             <span className="text-primary">Project Status :</span> {project?.projectStatus}
//           </div>

//           <div className="row g-4">
//             <div className="col-lg-6 col-md-12">
//               <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//                 <h5 className="text-primary fw-bold mb-3">
//                   <i className="bi bi-folder2-open me-2"></i>Project Details
//                 </h5>
//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Package</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.projectType === "package" && packageAllData.length > 0
//                         ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                         : "Custom Package"}
//                     </p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client Name</small>
//                     <p className="mb-0 fw-semibold">{project?.clientName}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Project ID</small>
//                     <p className="mb-0 fw-semibold">{project?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client ID</small>
//                     <p className="mb-0 fw-semibold">{project?.clientId?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Pricing</small>
//                     <p className="mb-0 text-success fw-bold">${project?.totalPrice}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Initiated</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.startAt && formatDateFunc(project.startAt)}
//                     </p>
//                   </div>

//                   {teamAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Team Allotted</small>
//                       <p className="mb-0">{teamAtDate}</p>
//                     </div>
//                   )}
//                   {startAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Project Start</small>
//                       <p className="mb-0">{startAtDate} {formatDate(project.startAt)}</p>
//                     </div>
//                   )}
//                   {expireAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Expire Date</small>
//                       <p className="mb-0 text-danger fw-medium">{expireAtDate}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-12">
//               <h5 className="text-primary mb-3">Services</h5>
//               <div className="border rounded-4 shadow-sm p-3 bg-white">
//                 {project?.service?.map((serviceValue) => (
//                   <div key={serviceValue.serviceId} className="border-bottom pb-2 mb-3">
//                     <h6 className="text-capitalize fw-bold d-flex align-items-center justify-content-between">
//                       {serviceValue.serviceName}
//                       <span
//                         className={`status-badge ${
//                           serviceValue.status === "completed" ? "bg-success" : "bg-warning"
//                         }`}
//                       ></span>
//                     </h6>
//                     <small className="text-muted">
//                       {serviceValue?.serviceStart &&
//                         `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}`}
//                     </small>
//                     <p className="mb-0">{serviceValue?.brief}</p>
//                     <p className="text-capitalize fw-bold">freelancer price : ${serviceValue?.freelancerPrice}</p>
//                     <p className="text-capitalize fw-bold">company Price : ${serviceValue?.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* TEAM SECTION */}
//       <Container className="mb-4">
//         <section className="card p-4 shadow-sm">
//           {project?.team ? (
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Role</th>
//                     <th>Name</th>
//                     <th>Profile</th>
//                     <th>Send rating only assistant <span className="text-warning">★★★★★</span></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{project.team.assistant.role}</td>
//                     <td>{project.team.assistant.staffName}</td>
//                     <td>
//                       <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                     </td>
//                     <td>
//                       <Button variant="contained" color="warning" size="small" onClick={handleOpen}>
//                         Rate Assistant ⭐
//                       </Button>
//                     </td>
//                   </tr>
//                   {project.team.team?.map((teamValue, i) => (
//                     <tr key={i}>
//                       <td>{teamValue.role}</td>
//                       <td>{teamValue.staffName}</td>
//                       <td>
//                         <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                       </td>
//                       <td>—</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center">
//               <p>No team is assigned.</p>
//               <Link className="btn btn-dark" to={`/dashboard/make-team/${projectId}`}>
//                 <i className="fas fa-users me-2"></i>Make a Team
//               </Link>
//             </div>
//           )}
//         </section>
//       </Container>

//       {/* ⭐ Existing Customer Ratings Display */}
//       {ratingAllData?.filter((r) => r.projectId === project?._id).length > 0 && (
//         <Container>
//           <section className="card p-4 shadow-sm">
//             <h4 className="text-primary mb-3">Customer Ratings</h4>
//             {ratingAllData
//               .filter((r) => r.projectId === project._id)
//               .map((ratingValue) => (
//                 <div key={ratingValue._id} className="mb-3 border-bottom pb-3">
//                   <Rating
//                     count={5}
//                     value={ratingValue.ratingStar}
//                     size={24}
//                     edit={false}
//                     activeColor="#ff6c00"
//                   />
//                   <p className="mt-2">{ratingValue.ratingComment}</p>
//                 </div>
//               ))}
//           </section>
//         </Container>
//       )}

//       {/* ⭐ Rating Modal */}
//       <Modal open={openModal} onClose={handleClose}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Rate Assistant
//           </Typography>

//           <Rating
//             count={5}
//             value={ratingValue}
//             onChange={(newValue) => setRatingValue(newValue)}
//             size={40}
//             activeColor="#ffd700"
//           />

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mt: 3, mb: 2 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ProjectViewPage;










// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ New States for Rating Modal
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   // ⚡ Find if this assistant already rated
//   const assistantRating = ratingAllData?.find(
//     (r) =>
//       r.projectId === project?._id &&
//       r.employ === project?.team?.assistant?.staffId
//   );
// console.log("project",project)
//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Project View </title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold text-primary">
//             Project Details
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <div className="project-details-box rounded-top p-4 shadow-sm">
//           <div className="text-end mb-3 fw-medium">
//             <span className="text-primary">Project Status :</span> {project?.projectStatus}
//           </div>

//           <div className="row g-4">
//             <div className="col-lg-6 col-md-12">
//               <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//                 <h5 className="text-primary fw-bold mb-3">
//                   <i className="bi bi-folder2-open me-2"></i>Project Details
//                 </h5>
//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Package</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.projectType === "package" && packageAllData.length > 0
//                         ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                         : "Custom Package"}
//                     </p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client Name</small>
//                     <p className="mb-0 fw-semibold">{project?.clientName}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Project ID</small>
//                     <p className="mb-0 fw-semibold">{project?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client ID</small>
//                     <p className="mb-0 fw-semibold">{project?.clientId?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Pricing</small>
//                     <p className="mb-0 text-success fw-bold">${project?.totalPrice}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Initiated</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.startAt && formatDateFunc(project.startAt)}
//                     </p>
//                   </div>

//                   {teamAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Team Allotted</small>
//                       <p className="mb-0">{teamAtDate}</p>
//                     </div>
//                   )}
//                   {startAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Project Start</small>
//                       <p className="mb-0">{startAtDate} {formatDate(project.startAt)}</p>
//                     </div>
//                   )}
//                   {expireAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Expire Date</small>
//                       <p className="mb-0 text-danger fw-medium">{expireAtDate}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-12">
//               <h5 className="text-primary mb-3">Services</h5>
//               <div className="border rounded-4 shadow-sm p-3 bg-white">
//                 {project?.service?.map((serviceValue) => (
//                   <div key={serviceValue.serviceId} className="border-bottom pb-2 mb-3">
//                     <h6 className="text-capitalize fw-bold d-flex align-items-center justify-content-between">
//                       {serviceValue.serviceName}
//                       {/* <span
//                         className={`status-badge ${
//                           serviceValue.status === "completed" ? "bg-primary" : "bg-warning"
//                         }`}
//                       ></span> */}

//                       <span className="ms-2">
//   <span
//     className={`status-badge ${
//       project.projectStatus === "completed"
//         ? "bg-success"
//         : project.projectStatus === "running"
//         ? "bg-primary"
//         : "bg-warning"
//     }`}
//   >
//     {/* {project.projectStatus} */}
//   </span>
// </span>

//                     </h6>
//                     <small className="text-muted">
//                       {serviceValue?.serviceStart &&
//                         `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}`}
//                     </small>
//                     <p className="mb-0">{serviceValue?.brief}</p>
//                     {/* <p className="text-capitalize fw-bold">freelancer price : ${serviceValue?.freelancerPrice}</p> */}
//                     {project.team?.team?.some(
//   (member) => member.staffId?.source === "Freelancer"
// ) && (
//   <p>
//     <strong>Freelancer Price :</strong> ${serviceValue.freelancerPrice}
//   </p>
// )}

//                     <p className="text-capitalize fw-bold">company Price : ${serviceValue?.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* TEAM SECTION */}
//       {/* <Container className="mb-4">
//         <section className="card p-4 shadow-sm">
//           {project?.team ? (
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Role</th>
//                     <th>Name</th>
//                     <th>Profile</th>
//                     <th>Send rating only assistant <span className="text-warning">★★★★★</span></th>
//                     <th>customer rating <span className="text-warning">★★★★★</span></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{project.team.assistant.role}</td>
//                     <td>{project.team.assistant.staffName}</td>
//                     <td>
//                       <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                     </td>
//                     <td>
//                       {assistantRating ? (
//                         <div className="text-center">
//                           <Rating
//                             count={5}
//                             value={assistantRating.ratingStar}
//                             size={24}
//                             edit={false}
//                             activeColor="#ff6c00"
//                           />
//                           <p className="small text-muted mb-0">
//                             {assistantRating.ratingStar} / 5
//                           </p>
//                         </div>
//                       ) : (
//                         <Button variant="contained" color="warning" size="small" onClick={handleOpen}>
//                           Rate Assistant ⭐
//                         </Button>
//                       )}
//                     </td>
//                   </tr>

//                   {project.team.team?.map((teamValue, i) => (
//                     <tr key={i}>
//                       <td>{teamValue.role}</td>
//                       <td>{teamValue.staffName}</td>
//                       <td>
//                         <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                       </td>
//                       <td>—</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center">
//               <p>No team is assigned.</p>
//               <Link className="btn btn-dark" to={`/dashboard/make-team/${projectId}`}>
//                 <i className="fas fa-users me-2"></i>Make a Team
//               </Link>
//             </div>
//           )}
//         </section>
//       </Container> */}

// {/* TEAM SECTION */}
// <Container className="mb-4">
//   <section className="card p-4 shadow-sm">
//     {/* {project?.team ? (
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead className="table-light">
//             <tr>
//               <th>Role</th>
//               <th>Name</th>
//               <th>Profile</th>
//               <th>Rate Assistant ⭐</th>
//               <th>Customer Rating ⭐</th>
//             </tr>
//           </thead>
//           <tbody>
          
//             <tr>
//               <td>{project.team.assistant.role}</td>
//               <td>{project.team.assistant.staffName}</td>
//               <td>
//                 <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//               </td>
//               <td>
//                 {assistantRating ? (
//                   <div className="text-center">
//                     <Rating
//                       count={5}
//                       value={assistantRating.ratingStar}
//                       size={24}
//                       edit={false}
//                       activeColor="#ff6c00"
//                     />
//                     <p className="small text-muted mb-0">
//                       {assistantRating.ratingStar} / 5
//                     </p>
//                   </div>
//                 ) : (
//                   <Button
//                     variant="contained"
//                     color="warning"
//                     size="small"
//                     onClick={handleOpen}
//                   >
//                     Rate Assistant ⭐
//                   </Button>
//                 )}
//               </td>
             
//               <td>—</td>
//             </tr>

       
//             {project.team.team?.map((member, i) => {
//               const memberRatings = ratingAllData?.filter(
//                 (r) =>
//                   r.projectId === project?._id && r.employ === member.staffId
//               );

//               return (
//                 <tr key={i}>
//                   <td>{member.role}</td>
//                   <td>{member.staffName}</td>
//                   <td>
//                     <Link className="btn btn-sm btn-outline-primary">
//                       Profile View
//                     </Link>
//                   </td>
               
//                   <td>—</td>
                
//                   <td>
//                     {memberRatings?.length > 0 ? (
//                       memberRatings.map((r, idx) => (
//                         <div key={idx} className="text-center">
//                           <Rating
//                             count={5}
//                             value={r.ratingStar}
//                             size={24}
//                             edit={false}
//                             activeColor="#ff6c00"
//                           />
//                           <p className="small text-muted mb-0">
//                             {r.ratingStar} / 5
//                           </p>
//                         </div>
//                       ))
//                     ) : (
//                       <span className="text-muted">No ratings yet</span>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     ) : (
//       <div className="text-center">
//         <p>No team is assigned.</p>
//         <Link className="btn btn-dark" to={`/dashboard/make-team/${projectId}`}>
//           <i className="fas fa-users me-2"></i>Make a Team
//         </Link>
//       </div>
//     )} */}


//     {project?.team ? (
//   <div className="table-responsive">
//     <table className="table table-striped align-middle">
//       <thead className="table-light">
//         <tr>
//           <th>Role</th>
//           <th>Name</th>
//           <th>Source</th>
//           <th>Profile</th>
//           <th>Rate Assistant ⭐</th>
//           <th>Customer Rating ⭐</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* Assistant Row */}
//         <tr>
//           <td>{project.team.assistant?.role || "—"}</td>
//           <td>{project.team.assistant?.staffName || "—"}</td>
//           <td>
//             {project.team.assistant?.source
//               ? project.team.assistant.source
//               : "Internal"}
//           </td>
//           <td>
//             <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//           </td>
//           <td>
//             {assistantRating ? (
//               <div className="text-center">
//                 <Rating
//                   count={5}
//                   value={assistantRating.ratingStar}
//                   size={24}
//                   edit={false}
//                   activeColor="#ff6c00"
//                 />
//                 <p className="small text-muted mb-0">
//                   {assistantRating.ratingStar} / 5
//                 </p>
//               </div>
//             ) : (
//               <Button
//                 variant="contained"
//                 color="warning"
//                 size="small"
//                 onClick={handleOpen}
//               >
//                 Rate Assistant ⭐
//               </Button>
//             )}
//           </td>
//           <td>—</td>
//         </tr>

//         {/* Other Team Members */}
//         {project.team.team?.map((member, i) => {
//           const memberRatings = ratingAllData?.filter(
//             (r) => r.projectId === project?._id && r.employ === member.staffId
//           );

//           return (
//             <tr key={i}>
//               <td>{member.role}</td>
//               <td>{member.staffName}</td>
//               <td>{member.staffId?.source || "Internal"}</td>
//               <td>
//                 <Link className="btn btn-sm btn-outline-primary">
//                   Profile View
//                 </Link>
//               </td>
//               <td>—</td>
//               <td>
//                 {memberRatings?.length > 0 ? (
//                   memberRatings.map((r, idx) => (
//                     <div key={idx} className="text-center">
//                       <Rating
//                         count={5}
//                         value={r.ratingStar}
//                         size={24}
//                         edit={false}
//                         activeColor="#ff6c00"
//                       />
//                       <p className="small text-muted mb-0">
//                         {r.ratingStar} / 5
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <span className="text-muted">No ratings yet</span>
//                 )}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// ) : null}

//   </section>
// </Container>


      

//       {/* ⭐ Existing Customer Ratings Display */}
// {/* ⭐ Existing Customer Ratings Display */}
// {/* {ratingAllData?.filter((r) => r.projectId === project?._id).length > 0 && (
//   <Container>
//     <section className="card p-4 shadow-sm">
//       <h4 className="text-primary mb-4">Customer Ratings</h4>

//       {ratingAllData
//         .filter((r) => r.projectId === project._id)
//         .map((ratingValue, index) => {
//           // Find which staff the rating belongs to
//           const ratedStaff =
//             project?.team?.assistant?.staffId === ratingValue.employ
//               ? project?.team?.assistant
//               : project?.team?.team?.find((t) => t.staffId === ratingValue.employ);

//           // ✅ Decide who gave the rating
//           const givenBy =
//             ratingValue.isAdminApproved && ratedStaff?.role?.toLowerCase() === "assistant"
//               ? "Admin"
//               : ratingValue?.clientName || "Anonymous";

//           return (
//             <div
//               key={index}
//               className="mb-3 pb-3 border-bottom"
//               style={{ lineHeight: "1.5" }}
//             >
//               <div className="d-flex align-items-center mb-2">
//                 <Rating
//                   count={5}
//                   value={ratingValue.ratingStar}
//                   size={24}
//                   edit={false}
//                   activeColor="#ff6c00"
//                 />
//               </div>

//               {ratingValue.ratingComment && (
//                 <p className="fst-italic text-dark mb-1">
//                   “{ratingValue.ratingComment}”
//                 </p>
//               )}

//               <small className="text-muted d-block">
//                 🧩 Rated for:{" "}
//                 <span className="fw-semibold text-capitalize text-dark">
//                   {ratedStaff?.staffName || "Unknown"} ({ratedStaff?.role || "—"})
//                 </span>
//               </small>

//               <small className="text-muted d-block">
//                 👤 Given by:{" "}
//                 <span
//                   className={`fw-semibold text-capitalize ${
//                     givenBy === "Admin" ? "text-danger" : "text-dark"
//                   }`}
//                 >
//                   {givenBy}
//                 </span>
//               </small>
//             </div>
//           );
//         })}
//     </section>
//   </Container>
// )} */}



//       {/* ⭐ Rating Modal */}
//       {/* <Modal open={openModal} onClose={handleClose}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Rate Assistant
//           </Typography>

//           <Rating
//             count={5}
//             value={ratingValue}
//             onChange={(newValue) => setRatingValue(newValue)}
//             size={40}
//             activeColor="#ffd700"
//           />

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mt: 3, mb: 2 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal> */}

//       {/* ⭐ Rating Modal */}
// <Modal
//   open={openModal}
//   onClose={() => setOpenModal(false)} // ✅ direct close
// >
//   <Box
//     sx={{
//       width: 400,
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       p: 4,
//       borderRadius: 2,
//       mx: "auto",
//       mt: 10,
//       position: "relative",
//     }}
//   >
//     {/* ❌ Close Icon */}
//     <button
//       onClick={() => setOpenModal(false)} // ✅ works 100%
//       style={{
//         position: "absolute",
//         top: "10px",
//         right: "10px",
//         background: "none",
//         border: "none",
//         fontSize: "22px",
//         cursor: "pointer",
//         color: "#555",
//         lineHeight: 1,
//       }}
//       title="Close"
//     >
//       &times;
//     </button>

//     <Typography
//       variant="h6"
//       mb={2}
//       textAlign="center"
//       fontWeight="bold"
//       color="primary"
//     >
//       Rate Assistant
//     </Typography>

//     <Box textAlign="center" mb={3}>
//       <Rating
//         count={5}
//         value={ratingValue}
//         onChange={(newValue) => setRatingValue(newValue)}
//         size={40}
//         activeColor="#ffd700"
//       />
//     </Box>

//     <TextField
//       fullWidth
//       multiline
//       minRows={3}
//       label="Write your feedback..."
//       value={feedback}
//       onChange={(e) => setFeedback(e.target.value)}
//       sx={{ mb: 3 }}
//     />

//     <Button
//       fullWidth
//       variant="contained"
//       color="primary"
//       onClick={handleSubmitRating}
//       disabled={loading}
//     >
//       {loading ? "Submitting..." : "Submit Feedback"}
//     </Button>
//   </Box>
// </Modal>

//     </>
//   );
// };

// export default ProjectViewPage;











// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ New States for Rating Modal
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   // ⚡ Find if this assistant already rated
//   const assistantRating = ratingAllData?.find(
//     (r) =>
//       r.projectId === project?._id &&
//       r.employ === project?.team?.assistant?.staffId
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Project View </title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold text-primary">
//             Project Details
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <div className="project-details-box rounded-top p-4 shadow-sm">
//           <div className="text-end mb-3 fw-medium">
//             <span className="text-primary">Project Status :</span> {project?.projectStatus}
//           </div>

//           <div className="row g-4">
//             <div className="col-lg-6 col-md-12">
//               <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//                 <h5 className="text-primary fw-bold mb-3">
//                   <i className="bi bi-folder2-open me-2"></i>Project Details
//                 </h5>
//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Package</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.projectType === "package" && packageAllData.length > 0
//                         ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                         : "Custom Package"}
//                     </p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client Name</small>
//                     <p className="mb-0 fw-semibold">{project?.clientName}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Project ID</small>
//                     <p className="mb-0 fw-semibold">{project?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client ID</small>
//                     <p className="mb-0 fw-semibold">{project?.clientId?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Pricing</small>
//                     <p className="mb-0 text-success fw-bold">${project?.totalPrice}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Initiated</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.startAt && formatDateFunc(project.startAt)}
//                     </p>
//                   </div>

//                   {teamAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Team Allotted</small>
//                       <p className="mb-0">{teamAtDate}</p>
//                     </div>
//                   )}
//                   {startAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Project Start</small>
//                       <p className="mb-0">{startAtDate} {formatDate(project.startAt)}</p>
//                     </div>
//                   )}
//                   {expireAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Expire Date</small>
//                       <p className="mb-0 text-danger fw-medium">{expireAtDate}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-12">
//               <h5 className="text-primary mb-3">Services</h5>
//               <div className="border rounded-4 shadow-sm p-3 bg-white">
//                 {project?.service?.map((serviceValue) => (
//                   <div key={serviceValue.serviceId} className="border-bottom pb-2 mb-3">
//                     <h6 className="text-capitalize fw-bold d-flex align-items-center justify-content-between">
//                       {serviceValue.serviceName}
//                       {/* <span
//                         className={`status-badge ${
//                           serviceValue.status === "completed" ? "bg-primary" : "bg-warning"
//                         }`}
//                       ></span> */}

//                       <span className="ms-2">
//   <span
//     className={`status-badge ${
//       project.projectStatus === "completed"
//         ? "bg-success"
//         : project.projectStatus === "running"
//         ? "bg-primary"
//         : "bg-warning"
//     }`}
//   >
//     {/* {project.projectStatus} */}
//   </span>
// </span>

//                     </h6>
//                     <small className="text-muted">
//                       {serviceValue?.serviceStart &&
//                         `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}`}
//                     </small>
//                     <p className="mb-0">{serviceValue?.brief}</p>
//                     {/* <p className="text-capitalize fw-bold">freelancer price : ${serviceValue?.freelancerPrice}</p> */}
//                     {project.team?.team?.some(
//   (member) => member.staffId?.source === "Freelancer"
// ) && (
//   <p>
//     <strong>Freelancer Price :</strong> ${serviceValue.freelancerPrice}
//   </p>
// )}

//                     <p className="text-capitalize fw-bold">company Price : ${serviceValue?.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* TEAM SECTION */}
//       {/* <Container className="mb-4">
//         <section className="card p-4 shadow-sm">
//           {project?.team ? (
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Role</th>
//                     <th>Name</th>
//                     <th>Profile</th>
//                     <th>Send rating only assistant <span className="text-warning">★★★★★</span></th>
//                     <th>customer rating <span className="text-warning">★★★★★</span></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{project.team.assistant.role}</td>
//                     <td>{project.team.assistant.staffName}</td>
//                     <td>
//                       <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                     </td>
//                     <td>
//                       {assistantRating ? (
//                         <div className="text-center">
//                           <Rating
//                             count={5}
//                             value={assistantRating.ratingStar}
//                             size={24}
//                             edit={false}
//                             activeColor="#ff6c00"
//                           />
//                           <p className="small text-muted mb-0">
//                             {assistantRating.ratingStar} / 5
//                           </p>
//                         </div>
//                       ) : (
//                         <Button variant="contained" color="warning" size="small" onClick={handleOpen}>
//                           Rate Assistant ⭐
//                         </Button>
//                       )}
//                     </td>
//                   </tr>

//                   {project.team.team?.map((teamValue, i) => (
//                     <tr key={i}>
//                       <td>{teamValue.role}</td>
//                       <td>{teamValue.staffName}</td>
//                       <td>
//                         <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                       </td>
//                       <td>—</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center">
//               <p>No team is assigned.</p>
//               <Link className="btn btn-dark" to={`/dashboard/make-team/${projectId}`}>
//                 <i className="fas fa-users me-2"></i>Make a Team
//               </Link>
//             </div>
//           )}
//         </section>
//       </Container> */}

// {/* TEAM SECTION */}
// <Container className="mb-4">
//   <section className="card p-4 shadow-sm">
//     {/* {project?.team ? (
//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead className="table-light">
//             <tr>
//               <th>Role</th>
//               <th>Name</th>
//               <th>Profile</th>
//               <th>Rate Assistant ⭐</th>
//               <th>Customer Rating ⭐</th>
//             </tr>
//           </thead>
//           <tbody>
          
//             <tr>
//               <td>{project.team.assistant.role}</td>
//               <td>{project.team.assistant.staffName}</td>
//               <td>
//                 <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//               </td>
//               <td>
//                 {assistantRating ? (
//                   <div className="text-center">
//                     <Rating
//                       count={5}
//                       value={assistantRating.ratingStar}
//                       size={24}
//                       edit={false}
//                       activeColor="#ff6c00"
//                     />
//                     <p className="small text-muted mb-0">
//                       {assistantRating.ratingStar} / 5
//                     </p>
//                   </div>
//                 ) : (
//                   <Button
//                     variant="contained"
//                     color="warning"
//                     size="small"
//                     onClick={handleOpen}
//                   >
//                     Rate Assistant ⭐
//                   </Button>
//                 )}
//               </td>
             
//               <td>—</td>
//             </tr>

       
//             {project.team.team?.map((member, i) => {
//               const memberRatings = ratingAllData?.filter(
//                 (r) =>
//                   r.projectId === project?._id && r.employ === member.staffId
//               );

//               return (
//                 <tr key={i}>
//                   <td>{member.role}</td>
//                   <td>{member.staffName}</td>
//                   <td>
//                     <Link className="btn btn-sm btn-outline-primary">
//                       Profile View
//                     </Link>
//                   </td>
               
//                   <td>—</td>
                
//                   <td>
//                     {memberRatings?.length > 0 ? (
//                       memberRatings.map((r, idx) => (
//                         <div key={idx} className="text-center">
//                           <Rating
//                             count={5}
//                             value={r.ratingStar}
//                             size={24}
//                             edit={false}
//                             activeColor="#ff6c00"
//                           />
//                           <p className="small text-muted mb-0">
//                             {r.ratingStar} / 5
//                           </p>
//                         </div>
//                       ))
//                     ) : (
//                       <span className="text-muted">No ratings yet</span>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     ) : (
//       <div className="text-center">
//         <p>No team is assigned.</p>
//         <Link className="btn btn-dark" to={`/dashboard/make-team/${projectId}`}>
//           <i className="fas fa-users me-2"></i>Make a Team
//         </Link>
//       </div>
//     )} */}


//     {project?.team ? (
//   <div className="table-responsive">
//     <table className="table table-striped align-middle">
//       <thead className="table-light">
//         <tr>
//           <th>Role</th>
//           <th>Name</th>
//           <th>Source</th>
//           <th>Profile</th>
//           <th>Rate Assistant ⭐</th>
//           <th>Customer Rating ⭐</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* Assistant Row */}
//         <tr>
//           <td>{project.team.assistant?.role || "—"}</td>
//           <td>{project.team.assistant?.staffName || "—"}</td>
//           <td>
//             {project.team.assistant?.source
//               ? project.team.assistant.source
//               : "Internal"}
//           </td>
//           <td>
//             <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//           </td>
//           <td>
//             {assistantRating ? (
//               <div className="text-center">
//                 <Rating
//                   count={5}
//                   value={assistantRating.ratingStar}
//                   size={24}
//                   edit={false}
//                   activeColor="#ff6c00"
//                 />
//                 <p className="small text-muted mb-0">
//                   {assistantRating.ratingStar} / 5
//                 </p>
//               </div>
//             ) : (
//               <Button
//                 variant="contained"
//                 color="warning"
//                 size="small"
//                 onClick={handleOpen}
//               >
//                 Rate Assistant ⭐
//               </Button>
//             )}
//           </td>
//           <td>—</td>
//         </tr>

//         {/* Other Team Members */}
//         {project.team.team?.map((member, i) => {
//           const memberRatings = ratingAllData?.filter(
//             (r) => r.projectId === project?._id && r.employ === member.staffId
//           );

//           return (
//             <tr key={i}>
//               <td>{member.role}</td>
//               <td>{member.staffName}</td>
//               <td>{member.staffId?.source || "Internal"}</td>
//               <td>
//                 <Link className="btn btn-sm btn-outline-primary">
//                   Profile View
//                 </Link>
//               </td>
//               <td>—</td>
//               <td>
//                 {memberRatings?.length > 0 ? (
//                   memberRatings.map((r, idx) => (
//                     <div key={idx} className="text-center">
//                       <Rating
//                         count={5}
//                         value={r.ratingStar}
//                         size={24}
//                         edit={false}
//                         activeColor="#ff6c00"
//                       />
//                       <p className="small text-muted mb-0">
//                         {r.ratingStar} / 5
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <span className="text-muted">No ratings yet</span>
//                 )}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   </div>
// ) : null}

//   </section>








// {/* PAYMENT DETAILS SECTION */}
// {project?.payment && (
//   <div className="col-lg-12 col-md-12 mb-4 mt-5">
//     <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//       <h5 className="text-primary fw-bold mb-3">
//         <i className="bi bi-credit-card me-2"></i>Payment Details
//       </h5>
      
//       <div className="row">
//         {/* Payment Status */}
//         <div className="col-12 mb-3">
//           <div className="d-flex justify-content-between align-items-center p-3 rounded-3" 
//                style={{ backgroundColor: project.payment.status === 'completed' ? '#d1f4e0' : '#fff3cd' }}>
//             <span className="fw-semibold">Payment Status</span>
//             <span className={`badge ${project.payment.status === 'completed' ? 'bg-success' : 'bg-warning'} px-3 py-2`}>
//               {project.payment.status.toUpperCase()}
//             </span>
//           </div>
//         </div>

//         {/* Transaction ID */}
//         <div className="col-md-6 mb-3">
//           <small className="text-muted">Transaction ID</small>
//           <p className="mb-0 fw-semibold text-break">
//             {project.payment.transactionId || '—'}
//           </p>
//         </div>

//         {/* PayPal Order ID */}
//         <div className="col-md-6 mb-3">
//           <small className="text-muted">PayPal Order ID</small>
//           <p className="mb-0 fw-semibold text-break">
//             {project.payment.paypalOrderId || '—'}
//           </p>
//         </div>

//         {/* Payment Provider */}
//         <div className="col-md-6 mb-3">
//           <small className="text-muted">Payment Provider</small>
//           <p className="mb-0 fw-semibold text-capitalize">
//             <i className="bi bi-paypal text-primary me-1"></i>
//             {project.payment.provider || '—'}
//           </p>
//         </div>

//         {/* Currency */}
//         <div className="col-md-6 mb-3">
//           <small className="text-muted">Currency</small>
//           <p className="mb-0 fw-semibold">
//             {project.payment.currency || 'USD'}
//           </p>
//         </div>

//         {/* Subtotal */}
//         <div className="col-md-6 mb-3">
//           <small className="text-muted">Subtotal</small>
//           <p className="mb-0 fw-bold text-dark">
//             ${project.payment.subtotal?.toFixed(2) || '0.00'}
//           </p>
//         </div>

//         {/* Discount Amount */}
//         {project.payment.discountAmount > 0 && (
//           <div className="col-md-6 mb-3">
//             <small className="text-muted">Discount Applied</small>
//             <p className="mb-0 fw-bold text-success">
//               -${project.payment.discountAmount?.toFixed(2)}
//             </p>
//           </div>
//         )}

//         {/* Coupon Code */}
//         {project.payment.couponCode && (
//           <div className="col-md-6 mb-3">
//             <small className="text-muted">Coupon Code</small>
//             <p className="mb-0 fw-semibold">
//               <span className="badge bg-info text-dark px-2 py-1">
//                 {project.payment.couponCode}
//               </span>
//             </p>
//           </div>
//         )}

//         {/* Final Amount */}
//         <div className="col-12 mb-3">
//           <div className="p-3 rounded-3 border border-success bg-light">
//             <div className="d-flex justify-content-between align-items-center">
//               <span className="fw-bold text-dark fs-5">Final Amount</span>
//               <span className="fw-bold text-success fs-4">
//                 ${project.payment.finalAmount?.toFixed(2) || '0.00'}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Paid At */}
//         {project.payment.paidAt && (
//           <div className="col-md-6 mb-3">
//             <small className="text-muted">Paid At</small>
//             <p className="mb-0 fw-semibold">
//               {new Date(project.payment.paidAt).toLocaleDateString('en-US', {
//                 day: '2-digit',
//                 month: 'short',
//                 year: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//           </div>
//         )}

//         {/* Payer Information */}
//         {project.payment.payer && (
//           <div className="col-12 mb-3">
//             <small className="text-muted d-block mb-2">Payer Information</small>
//             <div className="p-3 rounded-3 bg-light border">
//               <div className="row">
//                 <div className="col-md-6 mb-2">
//                   <small className="text-muted">Name</small>
//                   <p className="mb-0 fw-semibold">{project.payment.payer.name}</p>
//                 </div>
//                 <div className="col-md-6 mb-2">
//                   <small className="text-muted">Email</small>
//                   <p className="mb-0 fw-semibold text-break">{project.payment.payer.email}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <small className="text-muted">Payer ID</small>
//                   <p className="mb-0 fw-semibold">{project.payment.payer.payerId}</p>
//                 </div>
//                 <div className="col-md-6">
//                   <small className="text-muted">Country</small>
//                   <p className="mb-0 fw-semibold text-uppercase">{project.payment.payer.country}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Dispute Status */}
//         {project.payment.dispute && (
//           <div className="col-12 mb-3">
//             <div className={`p-2 rounded-3 text-center ${
//               project.payment.dispute.isDisputed ? 'bg-danger text-white' : 'bg-success text-white'
//             }`}>
//               <small className="fw-semibold">
//                 {project.payment.dispute.isDisputed ? '⚠️ Disputed' : '✓ No Disputes'}
//               </small>
//             </div>
//           </div>
//         )}

//         {/* Refund Status */}
//         {project.payment.refund && project.payment.refund.isRefunded && (
//           <div className="col-12 mb-3">
//             <div className="p-3 rounded-3 bg-warning text-dark border border-warning">
//               <small className="fw-semibold d-block">⚠️ Refund Issued</small>
//               <span className="fw-bold">Amount: ${project.payment.refund.refundAmount?.toFixed(2)}</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Payment History */}
//       {project.payment.history && project.payment.history.length > 0 && (
//         <div className="mt-4">
//           <h6 className="text-secondary fw-bold mb-3">
//             <i className="bi bi-clock-history me-2"></i>Payment History
//           </h6>
//           <div className="timeline">
//             {project.payment.history.map((event, index) => (
//               <div key={index} className="timeline-item mb-3 pb-3 border-bottom">
//                 <div className="d-flex justify-content-between align-items-start">
//                   <div>
//                     <span className={`badge ${
//                       event.status === 'completed' ? 'bg-success' : 
//                       event.status === 'pending' ? 'bg-warning' : 'bg-secondary'
//                     } mb-1`}>
//                       {event.action.toUpperCase()}
//                     </span>
//                     <p className="mb-1 small">
//                       <strong>Amount:</strong> ${event.amount?.toFixed(2)}
//                     </p>
//                     <p className="mb-1 small text-muted">
//                       <strong>Transaction ID:</strong> {event.transactionId}
//                     </p>
//                     <p className="mb-0 small text-muted">
//                       {new Date(event.timestamp).toLocaleDateString('en-US', {
//                         day: '2-digit',
//                         month: 'short',
//                         year: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit'
//                       })}
//                     </p>
//                   </div>
//                   <span className="badge bg-light text-dark">
//                     {event.performedBy}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// )}








// </Container>


      

//       {/* ⭐ Existing Customer Ratings Display */}
// {/* ⭐ Existing Customer Ratings Display */}
// {/* {ratingAllData?.filter((r) => r.projectId === project?._id).length > 0 && (
//   <Container>
//     <section className="card p-4 shadow-sm">
//       <h4 className="text-primary mb-4">Customer Ratings</h4>

//       {ratingAllData
//         .filter((r) => r.projectId === project._id)
//         .map((ratingValue, index) => {
//           // Find which staff the rating belongs to
//           const ratedStaff =
//             project?.team?.assistant?.staffId === ratingValue.employ
//               ? project?.team?.assistant
//               : project?.team?.team?.find((t) => t.staffId === ratingValue.employ);

//           // ✅ Decide who gave the rating
//           const givenBy =
//             ratingValue.isAdminApproved && ratedStaff?.role?.toLowerCase() === "assistant"
//               ? "Admin"
//               : ratingValue?.clientName || "Anonymous";

//           return (
//             <div
//               key={index}
//               className="mb-3 pb-3 border-bottom"
//               style={{ lineHeight: "1.5" }}
//             >
//               <div className="d-flex align-items-center mb-2">
//                 <Rating
//                   count={5}
//                   value={ratingValue.ratingStar}
//                   size={24}
//                   edit={false}
//                   activeColor="#ff6c00"
//                 />
//               </div>

//               {ratingValue.ratingComment && (
//                 <p className="fst-italic text-dark mb-1">
//                   “{ratingValue.ratingComment}”
//                 </p>
//               )}

//               <small className="text-muted d-block">
//                 🧩 Rated for:{" "}
//                 <span className="fw-semibold text-capitalize text-dark">
//                   {ratedStaff?.staffName || "Unknown"} ({ratedStaff?.role || "—"})
//                 </span>
//               </small>

//               <small className="text-muted d-block">
//                 👤 Given by:{" "}
//                 <span
//                   className={`fw-semibold text-capitalize ${
//                     givenBy === "Admin" ? "text-danger" : "text-dark"
//                   }`}
//                 >
//                   {givenBy}
//                 </span>
//               </small>
//             </div>
//           );
//         })}
//     </section>
//   </Container>
// )} */}















//       {/* ⭐ Rating Modal */}
//       {/* <Modal open={openModal} onClose={handleClose}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Rate Assistant
//           </Typography>

//           <Rating
//             count={5}
//             value={ratingValue}
//             onChange={(newValue) => setRatingValue(newValue)}
//             size={40}
//             activeColor="#ffd700"
//           />

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mt: 3, mb: 2 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal> */}

//       {/* ⭐ Rating Modal */}
// <Modal
//   open={openModal}
//   onClose={() => setOpenModal(false)} // ✅ direct close
// >
//   <Box
//     sx={{
//       width: 400,
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       p: 4,
//       borderRadius: 2,
//       mx: "auto",
//       mt: 10,
//       position: "relative",
//     }}
//   >
//     {/* ❌ Close Icon */}
//     <button
//       onClick={() => setOpenModal(false)} // ✅ works 100%
//       style={{
//         position: "absolute",
//         top: "10px",
//         right: "10px",
//         background: "none",
//         border: "none",
//         fontSize: "22px",
//         cursor: "pointer",
//         color: "#555",
//         lineHeight: 1,
//       }}
//       title="Close"
//     >
//       &times;
//     </button>

//     <Typography
//       variant="h6"
//       mb={2}
//       textAlign="center"
//       fontWeight="bold"
//       color="primary"
//     >
//       Rate Assistant
//     </Typography>

//     <Box textAlign="center" mb={3}>
//       <Rating
//         count={5}
//         value={ratingValue}
//         onChange={(newValue) => setRatingValue(newValue)}
//         size={40}
//         activeColor="#ffd700"
//       />
//     </Box>

//     <TextField
//       fullWidth
//       multiline
//       minRows={3}
//       label="Write your feedback..."
//       value={feedback}
//       onChange={(e) => setFeedback(e.target.value)}
//       sx={{ mb: 3 }}
//     />

//     <Button
//       fullWidth
//       variant="contained"
//       color="primary"
//       onClick={handleSubmitRating}
//       disabled={loading}
//     >
//       {loading ? "Submitting..." : "Submit Feedback"}
//     </Button>
//   </Box>
// </Modal>

//     </>
//   );
// };

// export default ProjectViewPage;







// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ Rating Modal States
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 REFUND HANDLER
//   // const handleRefundClick = async () => {
//   //   const result = await Swal.fire({
//   //     title: "Process Refund?",
//   //     html: `
//   //       <div style="text-align: left; padding: 10px;">
//   //         <p><strong>Project ID:</strong> ${project._id}</p>
//   //         <p><strong>Total Amount:</strong> $${project.payment.finalAmount?.toFixed(2)}</p>
//   //         <hr style="margin: 15px 0;">
//   //         <label style="display: block; margin-bottom: 5px; font-weight: 600;">
//   //           Refund Amount (leave empty for full refund):
//   //         </label>
//   //         <input 
//   //           id="refund-amount" 
//   //           class="swal2-input" 
//   //           placeholder="Enter amount"
//   //           type="number"
//   //           step="0.01"
//   //           min="0.01"
//   //           max="${project.payment.finalAmount}"
//   //           style="width: 100%; margin-bottom: 15px;"
//   //         />
//   //         <label style="display: block; margin-bottom: 5px; font-weight: 600;">
//   //           Reason for refund:
//   //         </label>
//   //         <textarea 
//   //           id="refund-reason" 
//   //           class="swal2-textarea" 
//   //           placeholder="Enter reason (optional)"
//   //           style="width: 100%; min-height: 80px;"
//   //         ></textarea>
//   //       </div>
//   //     `,
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonText: "✓ Process Refund",
//   //     confirmButtonColor: "#d33",
//   //     cancelButtonText: "Cancel",
//   //     width: "500px",
//   //     preConfirm: () => {
//   //       const amount = document.getElementById("refund-amount").value.trim();
//   //       const reason = document.getElementById("refund-reason").value.trim();

//   //       if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > project.payment.finalAmount)) {
//   //         Swal.showValidationMessage(`Amount must be between $0.01 and $${project.payment.finalAmount}`);
//   //         return false;
//   //       }

//   //       return { 
//   //         amount: amount ? parseFloat(amount) : null, 
//   //         reason: reason || "Refund requested by admin" 
//   //       };
//   //     },
//   //   });

//   //   if (result.isConfirmed) {
//   //     try {
//   //       Swal.fire({
//   //         title: "Processing Refund...",
//   //         text: "Please wait while we process the refund",
//   //         allowOutsideClick: false,
//   //         allowEscapeKey: false,
//   //         didOpen: () => Swal.showLoading(),
//   //       });

//   //       const response = await axios.post(
//   //         `${Url}/paypal/refund-order`,
//   //         {
//   //           projectId: project._id,
//   //           amount: result.value.amount,
//   //           reason: result.value.reason,
//   //         },
//   //         {
//   //           headers: { authorization: localStorage.getItem("token") },
//   //         }
//   //       );

//   //       Swal.fire({
//   //         icon: "success",
//   //         title: "Refund Successful!",
//   //         html: `
//   //           <p><strong>Refund ID:</strong> ${response.data.refundId}</p>
//   //           <p><strong>Amount:</strong> $${response.data.amount?.toFixed(2)}</p>
//   //         `,
//   //         confirmButtonText: "OK",
//   //       });

//   //       // Refresh project data
//   //       await projectDetailsFunc();

//   //     } catch (error) {
//   //       console.error("Refund Error:", error);
//   //       Swal.fire({
//   //         icon: "error",
//   //         title: "Refund Failed",
//   //         text: error.response?.data?.message || error.message || "Something went wrong",
//   //         confirmButtonText: "OK",
//   //       });
//   //     }
//   //   }
//   // };


//   // handleRefundClick function update karo:

// const handleRefundClick = async () => {
//   const result = await Swal.fire({
//     title: "Process Refund?",
//     html: `
//       <div style="text-align: left; padding: 10px;">
//         <p><strong>Project ID:</strong> ${project._id}</p>
//         <p><strong>Total Amount:</strong> $${project.payment.finalAmount?.toFixed(2)}</p>
//         <hr style="margin: 15px 0;">
//         <label style="display: block; margin-bottom: 5px; font-weight: 600;">
//           Refund Amount (leave empty for full refund):
//         </label>
//         <input 
//           id="refund-amount" 
//           class="swal2-input" 
//           placeholder="Enter amount"
//           type="number"
//           step="0.01"
//           min="0.01"
//           max="${project.payment.finalAmount}"
//           style="width: 100%; margin-bottom: 15px;"
//         />
//         <label style="display: block; margin-bottom: 5px; font-weight: 600;">
//           Reason for refund:
//         </label>
//         <textarea 
//           id="refund-reason" 
//           class="swal2-textarea" 
//           placeholder="Enter reason (optional)"
//           style="width: 100%; min-height: 80px;"
//         ></textarea>
//       </div>
//     `,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "✓ Process Refund",
//     confirmButtonColor: "#d33",
//     cancelButtonText: "Cancel",
//     width: "500px",
//     preConfirm: () => {
//       const amount = document.getElementById("refund-amount").value.trim();
//       const reason = document.getElementById("refund-reason").value.trim();

//       if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > project.payment.finalAmount)) {
//         Swal.showValidationMessage(`Amount must be between $0.01 and $${project.payment.finalAmount}`);
//         return false;
//       }

//       return { 
//         amount: amount ? parseFloat(amount) : null, 
//         reason: reason || "Refund requested by admin" 
//       };
//     },
//   });

//   if (result.isConfirmed) {
//     try {
//       Swal.fire({
//         title: "Processing Refund...",
//         text: "Please wait while we process the refund",
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//         didOpen: () => Swal.showLoading(),
//       });

//       const response = await axios.post(
//         `${Url}/paypal/refund-order`,
//         {
//           projectId: project._id,
//           amount: result.value.amount,
//           reason: result.value.reason,
//         },
//         {
//           headers: { authorization: localStorage.getItem("token") },
//         }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Refund Successful!",
//         html: `
//           <p><strong>Refund ID:</strong> ${response.data.refundId}</p>
//           <p><strong>Amount:</strong> $${response.data.amount?.toFixed(2)}</p>
//         `,
//         confirmButtonText: "OK",
//       });

//       // Refresh project data
//       await projectDetailsFunc();

//     } catch (error) {
//       console.error("Refund Error:", error);
      
//       // 🔥 EXTRACT ERROR DETAILS
//       const errorMessage = error.response?.data?.message || "Refund failed";
//       const errorDetails = error.response?.data?.details || error.response?.data?.error || error.message;

//       // 🔥 SHOW DETAILED ERROR
//       Swal.fire({
//         icon: "error",
//         title: errorMessage,
//         html: errorDetails 
//           ? `<div style="text-align: left; padding: 10px;">
//                <p style="font-size: 14px; color: #666;">${errorDetails}</p>
//              </div>`
//           : undefined,
//         confirmButtonText: "OK",
//         width: "500px",
//       });
//     }
//   }
// };



//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   // ⚡ Find if this assistant already rated
//   const assistantRating = ratingAllData?.find(
//     (r) =>
//       r.projectId === project?._id &&
//       r.employ === project?.team?.assistant?.staffId
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Project View </title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold text-primary">
//             Project Details
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <div className="project-details-box rounded-top p-4 shadow-sm">
//           <div className="text-end mb-3 fw-medium">
//             <span className="text-primary">Project Status :</span> {project?.projectStatus}
//           </div>

//           <div className="row g-4">
//             <div className="col-lg-6 col-md-12">
//               <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//                 <h5 className="text-primary fw-bold mb-3">
//                   <i className="bi bi-folder2-open me-2"></i>Project Details
//                 </h5>
//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Package</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.projectType === "package" && packageAllData.length > 0
//                         ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                         : "Custom Package"}
//                     </p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client Name</small>
//                     <p className="mb-0 fw-semibold">{project?.clientName}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Project ID</small>
//                     <p className="mb-0 fw-semibold">{project?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client ID</small>
//                     <p className="mb-0 fw-semibold">{project?.clientId?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Pricing</small>
//                     <p className="mb-0 text-success fw-bold">${project?.totalPrice}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Initiated</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.startAt && formatDateFunc(project.startAt)}
//                     </p>
//                   </div>

//                   {teamAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Team Allotted</small>
//                       <p className="mb-0">{teamAtDate}</p>
//                     </div>
//                   )}
//                   {startAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Project Start</small>
//                       <p className="mb-0">{startAtDate} {formatDate(project.startAt)}</p>
//                     </div>
//                   )}
//                   {expireAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Expire Date</small>
//                       <p className="mb-0 text-danger fw-medium">{expireAtDate}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-12">
//               <h5 className="text-primary mb-3">Services</h5>
//               <div className="border rounded-4 shadow-sm p-3 bg-white">
//                 {project?.service?.map((serviceValue) => (
//                   <div key={serviceValue.serviceId} className="border-bottom pb-2 mb-3">
//                     <h6 className="text-capitalize fw-bold d-flex align-items-center justify-content-between">
//                       {serviceValue.serviceName}
//                       <span className="ms-2">
//                         <span
//                           className={`status-badge ${
//                             project.projectStatus === "completed"
//                               ? "bg-success"
//                               : project.projectStatus === "running"
//                               ? "bg-primary"
//                               : "bg-warning"
//                           }`}
//                         >
//                         </span>
//                       </span>
//                     </h6>
//                     <small className="text-muted">
//                       {serviceValue?.serviceStart &&
//                         `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}`}
//                     </small>
//                     <p className="mb-0">{serviceValue?.brief}</p>
//                     {project.team?.team?.some(
//                       (member) => member.staffId?.source === "Freelancer"
//                     ) && (
//                       <p>
//                         <strong>Freelancer Price :</strong> ${serviceValue.freelancerPrice}
//                       </p>
//                     )}
//                     <p className="text-capitalize fw-bold">company Price : ${serviceValue?.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* TEAM SECTION */}
//       <Container className="mb-4">
//         <section className="card p-4 shadow-sm">
//           {project?.team ? (
//             <div className="table-responsive">
//               <table className="table table-striped align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Role</th>
//                     <th>Name</th>
//                     <th>Source</th>
//                     <th>Profile</th>
//                     <th>Rate Assistant ⭐</th>
//                     <th>Customer Rating ⭐</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Assistant Row */}
//                   <tr>
//                     <td>{project.team.assistant?.role || "—"}</td>
//                     <td>{project.team.assistant?.staffName || "—"}</td>
//                     <td>
//                       {project.team.assistant?.source
//                         ? project.team.assistant.source
//                         : "Internal"}
//                     </td>
//                     <td>
//                       <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                     </td>
//                     <td>
//                       {assistantRating ? (
//                         <div className="text-center">
//                           <Rating
//                             count={5}
//                             value={assistantRating.ratingStar}
//                             size={24}
//                             edit={false}
//                             activeColor="#ff6c00"
//                           />
//                           <p className="small text-muted mb-0">
//                             {assistantRating.ratingStar} / 5
//                           </p>
//                         </div>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           size="small"
//                           onClick={handleOpen}
//                         >
//                           Rate Assistant ⭐
//                         </Button>
//                       )}
//                     </td>
//                     <td>—</td>
//                   </tr>

//                   {/* Other Team Members */}
//                   {project.team.team?.map((member, i) => {
//                     const memberRatings = ratingAllData?.filter(
//                       (r) => r.projectId === project?._id && r.employ === member.staffId
//                     );

//                     return (
//                       <tr key={i}>
//                         <td>{member.role}</td>
//                         <td>{member.staffName}</td>
//                         <td>{member.staffId?.source || "Internal"}</td>
//                         <td>
//                           <Link className="btn btn-sm btn-outline-primary">
//                             Profile View
//                           </Link>
//                         </td>
//                         <td>—</td>
//                         <td>
//                           {memberRatings?.length > 0 ? (
//                             memberRatings.map((r, idx) => (
//                               <div key={idx} className="text-center">
//                                 <Rating
//                                   count={5}
//                                   value={r.ratingStar}
//                                   size={24}
//                                   edit={false}
//                                   activeColor="#ff6c00"
//                                 />
//                                 <p className="small text-muted mb-0">
//                                   {r.ratingStar} / 5
//                                 </p>
//                               </div>
//                             ))
//                           ) : (
//                             <span className="text-muted">No ratings yet</span>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : null}
//         </section>

//         {/* PAYMENT DETAILS SECTION */}
//         {project?.payment && (
//           <div className="col-lg-12 col-md-12 mb-4 mt-5">
//             <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//               <h5 className="text-primary fw-bold mb-3">
//                 <i className="bi bi-credit-card me-2"></i>Payment Details
//               </h5>

//               <div className="row">
//                 {/* Payment Status */}
//                 <div className="col-12 mb-3">
//                   <div
//                     className="d-flex justify-content-between align-items-center p-3 rounded-3"
//                     style={{ backgroundColor: project.payment.status === "completed" ? "#d1f4e0" : "#fff3cd" }}
//                   >
//                     <span className="fw-semibold">Payment Status</span>
//                     <span
//                       className={`badge ${
//                         project.payment.status === "completed" ? "bg-success" : "bg-warning"
//                       } px-3 py-2`}
//                     >
//                       {project.payment.status.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Transaction ID */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted">Transaction ID</small>
//                   <p className="mb-0 fw-semibold text-break">
//                     {project.payment.transactionId || "—"}
//                   </p>
//                 </div>

//                 {/* PayPal Order ID */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted">PayPal Order ID</small>
//                   <p className="mb-0 fw-semibold text-break">
//                     {project.payment.paypalOrderId || "—"}
//                   </p>
//                 </div>

//                 {/* Payment Provider */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted">Payment Provider</small>
//                   <p className="mb-0 fw-semibold text-capitalize">
//                     <i className="bi bi-paypal text-primary me-1"></i>
//                     {project.payment.provider || "—"}
//                   </p>
//                 </div>

//                 {/* Currency */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted">Currency</small>
//                   <p className="mb-0 fw-semibold">{project.payment.currency || "USD"}</p>
//                 </div>

//                 {/* Subtotal */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted">Subtotal</small>
//                   <p className="mb-0 fw-bold text-dark">
//                     ${project.payment.subtotal?.toFixed(2) || "0.00"}
//                   </p>
//                 </div>

//                 {/* Discount Amount */}
//                 {project.payment.discountAmount > 0 && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted">Discount Applied</small>
//                     <p className="mb-0 fw-bold text-success">
//                       -${project.payment.discountAmount?.toFixed(2)}
//                     </p>
//                   </div>
//                 )}

//                 {/* Coupon Code */}
//                 {project.payment.couponCode && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted">Coupon Code</small>
//                     <p className="mb-0 fw-semibold">
//                       <span className="badge bg-info text-dark px-2 py-1">
//                         {project.payment.couponCode}
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Final Amount */}
//                 <div className="col-12 mb-3">
//                   <div className="p-3 rounded-3 border border-success bg-light">
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span className="fw-bold text-dark fs-5">Final Amount</span>
//                       <span className="fw-bold text-success fs-4">
//                         ${project.payment.finalAmount?.toFixed(2) || "0.00"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Paid At */}
//                 {project.payment.paidAt && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted">Paid At</small>
//                     <p className="mb-0 fw-semibold">
//                       {new Date(project.payment.paidAt).toLocaleDateString("en-US", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 )}

//                 {/* Payer Information */}
//                 {project.payment.payer && (
//                   <div className="col-12 mb-3">
//                     <small className="text-muted d-block mb-2">Payer Information</small>
//                     <div className="p-3 rounded-3 bg-light border">
//                       <div className="row">
//                         <div className="col-md-6 mb-2">
//                           <small className="text-muted">Name</small>
//                           <p className="mb-0 fw-semibold">{project.payment.payer.name}</p>
//                         </div>
//                         <div className="col-md-6 mb-2">
//                           <small className="text-muted">Email</small>
//                           <p className="mb-0 fw-semibold text-break">{project.payment.payer.email}</p>
//                         </div>
//                         <div className="col-md-6">
//                           <small className="text-muted">Payer ID</small>
//                           <p className="mb-0 fw-semibold">{project.payment.payer.payerId}</p>
//                         </div>
//                         <div className="col-md-6">
//                           <small className="text-muted">Country</small>
//                           <p className="mb-0 fw-semibold text-uppercase">{project.payment.payer.country}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Dispute Status */}
//                 {project.payment.dispute && (
//                   <div className="col-12 mb-3">
//                     <div
//                       className={`p-2 rounded-3 text-center ${
//                         project.payment.dispute.isDisputed ? "bg-danger text-white" : "bg-success text-white"
//                       }`}
//                     >
//                       <small className="fw-semibold">
//                         {project.payment.dispute.isDisputed ? "⚠️ Disputed" : "✓ No Disputes"}
//                       </small>
//                     </div>
//                   </div>
//                 )}

//                 {/* 🔥 REFUND BUTTON - Show only if payment is completed and not yet refunded */}
//                 {project.payment.status === "completed" && !project.payment.refund?.isRefunded && (
//                   <div className="col-12 mt-3">
//                     <Button
//                       variant="contained"
//                       color="error"
//                       fullWidth
//                       onClick={handleRefundClick}
//                       startIcon={<i className="bi bi-arrow-counterclockwise"></i>}
//                       sx={{ 
//                         padding: "12px",
//                         fontWeight: "bold",
//                         fontSize: "16px"
//                       }}
//                     >
//                       Process Refund
//                     </Button>
//                   </div>
//                 )}

//                 {/* 🔥 REFUND INFO - Show if already refunded */}
//                 {project.payment.refund?.isRefunded && (
//                   <div className="col-12 mt-3">
//                     <div className="alert alert-warning border border-warning shadow-sm">
//                       <div className="d-flex align-items-start">
//                         <i className="bi bi-exclamation-triangle-fill text-warning me-3" style={{ fontSize: "24px" }}></i>
//                         <div className="flex-grow-1">
//                           <h6 className="mb-2 fw-bold">⚠️ Refund Processed</h6>
//                           <p className="mb-1">
//                             <strong>Refund Amount:</strong> ${project.payment.refund.refundAmount?.toFixed(2)}
//                           </p>
//                           <p className="mb-1">
//                             <strong>Refund ID:</strong> {project.payment.refund.refundId}
//                           </p>
//                           <p className="mb-1">
//                             <strong>Status:</strong>{" "}
//                             <span className="badge bg-warning text-dark">
//                               {project.payment.refund.refundStatus?.toUpperCase()}
//                             </span>
//                           </p>
//                           <p className="mb-1">
//                             <strong>Date:</strong>{" "}
//                             {new Date(project.payment.refund.refundedAt).toLocaleString("en-US", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </p>
//                           {project.payment.refund.refundReason && (
//                             <p className="mb-0">
//                               <strong>Reason:</strong> {project.payment.refund.refundReason}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Payment History */}
//               {project.payment.history && project.payment.history.length > 0 && (
//                 <div className="mt-4">
//                   <h6 className="text-secondary fw-bold mb-3">
//                     <i className="bi bi-clock-history me-2"></i>Payment History
//                   </h6>
//                   <div className="timeline">
//                     {project.payment.history.map((event, index) => (
//                       <div key={index} className="timeline-item mb-3 pb-3 border-bottom">
//                         <div className="d-flex justify-content-between align-items-start">
//                           <div>
//                             <span
//                               className={`badge ${
//                                 event.status === "completed"
//                                   ? "bg-success"
//                                   : event.status === "pending"
//                                   ? "bg-warning"
//                                   : event.status === "refunded"
//                                   ? "bg-danger"
//                                   : "bg-secondary"
//                               } mb-1`}
//                             >
//                               {event.action.toUpperCase()}
//                             </span>
//                             <p className="mb-1 small">
//                               <strong>Amount:</strong> ${event.amount?.toFixed(2)}
//                             </p>
//                             <p className="mb-1 small text-muted">
//                               <strong>Transaction ID:</strong> {event.transactionId}
//                             </p>
//                             {event.reason && (
//                               <p className="mb-1 small text-muted">
//                                 <strong>Reason:</strong> {event.reason}
//                               </p>
//                             )}
//                             <p className="mb-0 small text-muted">
//                               {new Date(event.timestamp).toLocaleDateString("en-US", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </p>
//                           </div>
//                           <span className="badge bg-light text-dark">{event.performedBy}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </Container>

//       {/* ⭐ Rating Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             position: "relative",
//           }}
//         >
//           {/* ❌ Close Icon */}
//           <button
//             onClick={() => setOpenModal(false)}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               background: "none",
//               border: "none",
//               fontSize: "22px",
//               cursor: "pointer",
//               color: "#555",
//               lineHeight: 1,
//             }}
//             title="Close"
//           >
//             &times;
//           </button>

//           <Typography variant="h6" mb={2} textAlign="center" fontWeight="bold" color="primary">
//             Rate Assistant
//           </Typography>

//           <Box textAlign="center" mb={3}>
//             <Rating
//               count={5}
//               value={ratingValue}
//               onChange={(newValue) => setRatingValue(newValue)}
//               size={40}
//               activeColor="#ffd700"
//             />
//           </Box>

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mb: 3 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ProjectViewPage;






// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ Rating Modal States
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 UNIFIED REFUND HANDLER - Supports both PayPal & Razorpay
//   const handleRefundClick = async () => {
//     const paymentProvider = project.payment?.provider || "unknown";
//     const paymentId = project.payment?.razorpayPaymentId || project.payment?.paypalOrderId;
//     const maxRefundAmount = project.payment?.finalAmount || 0;
//     const currency = project.payment?.currency || "USD";
//     const currencySymbol = currency === "INR" ? "₹" : "$";

//     // Determine endpoint based on payment provider
//     const refundEndpoint = paymentProvider === "razorpay" 
//       ? `${Url}/api/razorpay/refund-order`
//       : `${Url}/paypal/refund-order`;

//     const result = await Swal.fire({
//       title: "Process Refund?",
//       html: `
//         <div style="text-align: left; padding: 15px; background: #f8f9fa; border-radius: 8px;">
//           <div style="margin-bottom: 15px; padding: 12px; background: white; border-radius: 6px; border-left: 4px solid #0166FF;">
//             <p style="margin: 5px 0;"><strong>Payment Provider:</strong> 
//               <span style="text-transform: uppercase; color: ${paymentProvider === 'razorpay' ? '#0166FF' : '#003087'};">
//                 ${paymentProvider}
//               </span>
//             </p>
//             <p style="margin: 5px 0;"><strong>Project ID:</strong> <code>${project._id}</code></p>
//             <p style="margin: 5px 0;"><strong>Payment ID:</strong> <code>${paymentId}</code></p>
//             <p style="margin: 5px 0; color: #d9534f; font-size: 18px;"><strong>Total Amount:</strong> ${currencySymbol}${maxRefundAmount.toFixed(2)}</p>
//           </div>
          
//           <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
          
//           <div style="margin-bottom: 15px;">
//             <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//               <i class="bi bi-cash-stack"></i> Refund Amount
//             </label>
//             <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
//               Leave empty for full refund (${currencySymbol}${maxRefundAmount.toFixed(2)})
//             </p>
//             <input 
//               id="refund-amount" 
//               class="swal2-input" 
//               placeholder="Enter custom amount"
//               type="number"
//               step="0.01"
//               min="0.01"
//               max="${maxRefundAmount}"
//               style="width: 100%; margin: 0; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 15px;"
//             />
//           </div>
          
//           <div>
//             <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//               <i class="bi bi-chat-left-text"></i> Reason for Refund
//             </label>
//             <textarea 
//               id="refund-reason" 
//               class="swal2-textarea" 
//               placeholder="Enter refund reason (optional)"
//               style="width: 100%; min-height: 90px; padding: 10px; border: 2px solid #ddd; border-radius: 6px; resize: vertical; font-size: 14px;"
//             ></textarea>
//           </div>
//         </div>
//       `,
//       icon: "warning",
//       iconColor: "#ff9800",
//       showCancelButton: true,
//       confirmButtonText: '<i class="bi bi-check-circle"></i> Process Refund',
//       confirmButtonColor: "#d33",
//       cancelButtonText: '<i class="bi bi-x-circle"></i> Cancel',
//       cancelButtonColor: "#6c757d",
//       width: "600px",
//       customClass: {
//         popup: 'refund-popup',
//         confirmButton: 'refund-confirm-btn',
//         cancelButton: 'refund-cancel-btn'
//       },
//       preConfirm: () => {
//         const amount = document.getElementById("refund-amount").value.trim();
//         const reason = document.getElementById("refund-reason").value.trim();

//         if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxRefundAmount)) {
//           Swal.showValidationMessage(
//             `Amount must be between ${currencySymbol}0.01 and ${currencySymbol}${maxRefundAmount.toFixed(2)}`
//           );
//           return false;
//         }

//         return { 
//           amount: amount ? parseFloat(amount) : null, 
//           reason: reason || "Refund requested by admin" 
//         };
//       },
//     });

//     if (result.isConfirmed) {
//       try {
//         Swal.fire({
//           title: "Processing Refund...",
//           html: `
//             <div style="text-align: center; padding: 20px;">
//               <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem; margin-bottom: 15px;">
//                 <span class="visually-hidden">Loading...</span>
//               </div>
//               <p style="font-size: 14px; color: #666; margin: 0;">
//                 Please wait while we process the refund via <strong style="text-transform: uppercase;">${paymentProvider}</strong>
//               </p>
//             </div>
//           `,
//           allowOutsideClick: false,
//           allowEscapeKey: false,
//           showConfirmButton: false,
//         });

//         const response = await axios.post(
//           refundEndpoint,
//           {
//             projectId: project._id,
//             amount: result.value.amount,
//             reason: result.value.reason,
//           },
//           {
//             headers: { authorization: localStorage.getItem("token") },
//           }
//         );

//         const refundedAmount = response.data.amount || result.value.amount || maxRefundAmount;

//         Swal.fire({
//           icon: "success",
//           title: "Refund Successful!",
//           html: `
//             <div style="text-align: left; padding: 15px; background: #f8f9fa; border-radius: 8px;">
//               <div style="text-align: center; margin-bottom: 15px;">
//                 <i class="bi bi-check-circle-fill" style="font-size: 48px; color: #28a745;"></i>
//               </div>
              
//               <div style="padding: 12px; background: white; border-radius: 6px; margin-bottom: 10px;">
//                 <p style="margin: 5px 0;"><strong>Refund ID:</strong> <code>${response.data.refundId}</code></p>
//                 <p style="margin: 5px 0;"><strong>Amount Refunded:</strong> 
//                   <span style="color: #28a745; font-size: 18px; font-weight: bold;">
//                     ${currencySymbol}${refundedAmount.toFixed(2)}
//                   </span>
//                 </p>
//                 <p style="margin: 5px 0;"><strong>Provider:</strong> 
//                   <span style="text-transform: uppercase; color: ${paymentProvider === 'razorpay' ? '#0166FF' : '#003087'};">
//                     ${paymentProvider}
//                   </span>
//                 </p>
//                 <p style="margin: 5px 0;"><strong>Status:</strong> 
//                   <span class="badge bg-success">Processed</span>
//                 </p>
//               </div>
              
//               <p style="font-size: 13px; color: #666; margin: 10px 0 0 0; text-align: center;">
//                 <i class="bi bi-info-circle"></i> The refund will be credited within 5-7 business days
//               </p>
//             </div>
//           `,
//           confirmButtonText: "OK",
//           confirmButtonColor: "#28a745",
//           width: "550px",
//         });

//         // Refresh project data
//         await projectDetailsFunc();

//       } catch (error) {
//         console.error("Refund Error:", error);
        
//         const errorMessage = error.response?.data?.message || "Refund failed";
//         const errorDetails = error.response?.data?.details || 
//                             error.response?.data?.error || 
//                             error.message;

//         Swal.fire({
//           icon: "error",
//           title: "Refund Failed",
//           html: `
//             <div style="text-align: left; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ff6b6b;">
//               <p style="margin: 0 0 10px 0; font-weight: bold; color: #721c24;">
//                 <i class="bi bi-exclamation-triangle-fill"></i> ${errorMessage}
//               </p>
//               ${errorDetails ? `
//                 <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 10px;">
//                   <p style="margin: 0; font-size: 13px; color: #666; font-family: monospace;">
//                     ${errorDetails}
//                   </p>
//                 </div>
//               ` : ''}
//               <p style="margin: 10px 0 0 0; font-size: 12px; color: #856404;">
//                 If the issue persists, please contact support.
//               </p>
//             </div>
//           `,
//           confirmButtonText: "OK",
//           confirmButtonColor: "#d33",
//           width: "550px",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   // ⚡ Find if this assistant already rated
//   const assistantRating = ratingAllData?.find(
//     (r) =>
//       r.projectId === project?._id &&
//       r.employ === project?.team?.assistant?.staffId
//   );

//   // 🎨 Determine payment provider icon and color
//   const getPaymentProviderBadge = (provider) => {
//     if (provider === "razorpay") {
//       return {
//         icon: "💳",
//         name: "Razorpay",
//         color: "#0166FF",
//         bgColor: "#E3F2FD"
//       };
//     } else if (provider === "paypal") {
//       return {
//         icon: "🅿️",
//         name: "PayPal",
//         color: "#003087",
//         bgColor: "#E8F4F8"
//       };
//     }
//     return {
//       icon: "💰",
//       name: provider || "Unknown",
//       color: "#6c757d",
//       bgColor: "#f8f9fa"
//     };
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Project View </title>
//       </Helmet>

//       {/* Custom CSS for improved styling */}
//       <style>
//         {`
//           .refund-popup {
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
//           }
          
//           .refund-confirm-btn, .refund-cancel-btn {
//             font-weight: 600 !important;
//             padding: 10px 24px !important;
//             border-radius: 6px !important;
//             font-size: 15px !important;
//           }
          
//           .payment-card {
//             transition: transform 0.2s, box-shadow 0.2s;
//           }
          
//           .payment-card:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
//           }
          
//           .status-badge {
//             display: inline-block;
//             padding: 4px 12px;
//             border-radius: 12px;
//             font-size: 12px;
//             font-weight: 600;
//             text-transform: uppercase;
//             letter-spacing: 0.5px;
//           }
          
//           .provider-badge {
//             display: inline-flex;
//             align-items: center;
//             gap: 6px;
//             padding: 6px 14px;
//             border-radius: 20px;
//             font-weight: 600;
//             font-size: 14px;
//           }
//         `}
//       </style>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold text-primary">
//             Project Details
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <div className="project-details-box rounded-top p-4 shadow-sm">
//           <div className="text-end mb-3 fw-medium">
//             <span className="text-primary">Project Status :</span> {project?.projectStatus}
//           </div>

//           <div className="row g-4">
//             <div className="col-lg-6 col-md-12">
//               <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//                 <h5 className="text-primary fw-bold mb-3">
//                   <i className="bi bi-folder2-open me-2"></i>Project Details
//                 </h5>
//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Package</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.projectType === "package" && packageAllData.length > 0
//                         ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                         : "Custom Package"}
//                     </p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client Name</small>
//                     <p className="mb-0 fw-semibold">{project?.clientName}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Project ID</small>
//                     <p className="mb-0 fw-semibold">{project?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client ID</small>
//                     <p className="mb-0 fw-semibold">{project?.clientId?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Pricing</small>
//                     <p className="mb-0 text-success fw-bold">${project?.totalPrice}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Initiated</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.startAt && formatDateFunc(project.startAt)}
//                     </p>
//                   </div>

//                   {teamAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Team Allotted</small>
//                       <p className="mb-0">{teamAtDate}</p>
//                     </div>
//                   )}
//                   {startAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Project Start</small>
//                       <p className="mb-0">{startAtDate} {formatDate(project.startAt)}</p>
//                     </div>
//                   )}
//                   {expireAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Expire Date</small>
//                       <p className="mb-0 text-danger fw-medium">{expireAtDate}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-12">
//               <h5 className="text-primary mb-3">Services</h5>
//               <div className="border rounded-4 shadow-sm p-3 bg-white">
//                 {project?.service?.map((serviceValue) => (
//                   <div key={serviceValue.serviceId} className="border-bottom pb-2 mb-3">
//                     <h6 className="text-capitalize fw-bold d-flex align-items-center justify-content-between">
//                       {serviceValue.serviceName}
//                       <span className="ms-2">
//                         <span
//                           className={`status-badge ${
//                             project.projectStatus === "completed"
//                               ? "bg-success"
//                               : project.projectStatus === "running"
//                               ? "bg-primary"
//                               : "bg-warning"
//                           }`}
//                         >
//                         </span>
//                       </span>
//                     </h6>
//                     <small className="text-muted">
//                       {serviceValue?.serviceStart &&
//                         `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}`}
//                     </small>
//                     <p className="mb-0">{serviceValue?.brief}</p>
//                     {project.team?.team?.some(
//                       (member) => member.staffId?.source === "Freelancer"
//                     ) && (
//                       <p>
//                         <strong>Freelancer Price :</strong> ${serviceValue.freelancerPrice}
//                       </p>
//                     )}
//                     <p className="text-capitalize fw-bold">company Price : ${serviceValue?.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* TEAM SECTION */}
//       <Container className="mb-4">
//         <section className="card p-4 shadow-sm">
//           {project?.team ? (
//             <div className="table-responsive">
//               <table className="table table-striped align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Role</th>
//                     <th>Name</th>
//                     <th>Source</th>
//                     <th>Profile</th>
//                     <th>Rate Assistant ⭐</th>
//                     <th>Customer Rating ⭐</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Assistant Row */}
//                   <tr>
//                     <td>{project.team.assistant?.role || "—"}</td>
//                     <td>{project.team.assistant?.staffName || "—"}</td>
//                     <td>
//                       {project.team.assistant?.source
//                         ? project.team.assistant.source
//                         : "Internal"}
//                     </td>
//                     <td>
//                       <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                     </td>
//                     <td>
//                       {assistantRating ? (
//                         <div className="text-center">
//                           <Rating
//                             count={5}
//                             value={assistantRating.ratingStar}
//                             size={24}
//                             edit={false}
//                             activeColor="#ff6c00"
//                           />
//                           <p className="small text-muted mb-0">
//                             {assistantRating.ratingStar} / 5
//                           </p>
//                         </div>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           size="small"
//                           onClick={handleOpen}
//                         >
//                           Rate Assistant ⭐
//                         </Button>
//                       )}
//                     </td>
//                     <td>—</td>
//                   </tr>

//                   {/* Other Team Members */}
//                   {project.team.team?.map((member, i) => {
//                     const memberRatings = ratingAllData?.filter(
//                       (r) => r.projectId === project?._id && r.employ === member.staffId
//                     );

//                     return (
//                       <tr key={i}>
//                         <td>{member.role}</td>
//                         <td>{member.staffName}</td>
//                         <td>{member.staffId?.source || "Internal"}</td>
//                         <td>
//                           <Link className="btn btn-sm btn-outline-primary">
//                             Profile View
//                           </Link>
//                         </td>
//                         <td>—</td>
//                         <td>
//                           {memberRatings?.length > 0 ? (
//                             memberRatings.map((r, idx) => (
//                               <div key={idx} className="text-center">
//                                 <Rating
//                                   count={5}
//                                   value={r.ratingStar}
//                                   size={24}
//                                   edit={false}
//                                   activeColor="#ff6c00"
//                                 />
//                                 <p className="small text-muted mb-0">
//                                   {r.ratingStar} / 5
//                                 </p>
//                               </div>
//                             ))
//                           ) : (
//                             <span className="text-muted">No ratings yet</span>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : null}
//         </section>

//         {/* 🎨 IMPROVED PAYMENT DETAILS SECTION */}
//         {project?.payment && (
//           <div className="col-lg-12 col-md-12 mb-4 mt-5">
//             <div className="custom-info-card payment-card p-4 rounded-4 shadow-sm bg-white border">
//               {/* Header with Payment Provider Badge */}
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h5 className="text-primary fw-bold mb-0">
//                   <i className="bi bi-credit-card me-2"></i>Payment Details
//                 </h5>
//                 {project.payment.provider && (
//                   <span 
//                     className="provider-badge"
//                     style={{
//                       backgroundColor: getPaymentProviderBadge(project.payment.provider).bgColor,
//                       color: getPaymentProviderBadge(project.payment.provider).color
//                     }}
//                   >
//                     {getPaymentProviderBadge(project.payment.provider).icon}
//                     {getPaymentProviderBadge(project.payment.provider).name}
//                   </span>
//                 )}
//               </div>

//               <div className="row">
//                 {/* Payment Status */}
//                 <div className="col-12 mb-3">
//                   <div
//                     className="d-flex justify-content-between align-items-center p-3 rounded-3"
//                     style={{ 
//                       backgroundColor: project.payment.status === "completed" ? "#d1f4e0" : "#fff3cd",
//                       border: `2px solid ${project.payment.status === "completed" ? "#28a745" : "#ffc107"}`
//                     }}
//                   >
//                     <span className="fw-semibold">
//                       <i className="bi bi-info-circle me-2"></i>Payment Status
//                     </span>
//                     <span
//                       className={`status-badge ${
//                         project.payment.status === "completed" ? "bg-success text-white" : "bg-warning text-dark"
//                       }`}
//                     >
//                       {project.payment.status.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Transaction ID */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">
//                     <i className="bi bi-hash"></i> Transaction ID
//                   </small>
//                   <p className="mb-0 fw-semibold text-break" style={{ fontSize: "13px" }}>
//                     {project.payment.transactionId || "—"}
//                   </p>
//                 </div>

//                 {/* Payment Order ID (PayPal/Razorpay) */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">
//                     <i className="bi bi-receipt"></i> {project.payment.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
//                   </small>
//                   <p className="mb-0 fw-semibold text-break" style={{ fontSize: "13px" }}>
//                     {project.payment.razorpayOrderId || project.payment.paypalOrderId || "—"}
//                   </p>
//                 </div>

//                 {/* Currency */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">
//                     <i className="bi bi-currency-exchange"></i> Currency
//                   </small>
//                   <p className="mb-0 fw-semibold">
//                     <span className="badge bg-info text-dark">
//                       {project.payment.currency || "USD"}
//                     </span>
//                   </p>
//                 </div>

//                 {/* Subtotal */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">
//                     <i className="bi bi-calculator"></i> Subtotal
//                   </small>
//                   <p className="mb-0 fw-bold text-dark">
//                     {project.payment.currency === "INR" ? "₹" : "$"}
//                     {project.payment.subtotal?.toFixed(2) || "0.00"}
//                   </p>
//                 </div>

//                 {/* Discount Amount */}
//                 {project.payment.discountAmount > 0 && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">
//                       <i className="bi bi-percent"></i> Discount Applied
//                     </small>
//                     <p className="mb-0 fw-bold text-success">
//                       -{project.payment.currency === "INR" ? "₹" : "$"}
//                       {project.payment.discountAmount?.toFixed(2)}
//                     </p>
//                   </div>
//                 )}

//                 {/* Coupon Code */}
//                 {project.payment.couponCode && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">
//                       <i className="bi bi-ticket-perforated"></i> Coupon Code
//                     </small>
//                     <p className="mb-0">
//                       <span className="badge bg-info text-dark px-3 py-2" style={{ fontSize: "13px" }}>
//                         {project.payment.couponCode}
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Final Amount */}
//                 <div className="col-12 mb-3">
//                   <div className="p-3 rounded-3 border-2 border-success" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span className="fw-bold text-dark fs-5">
//                         <i className="bi bi-cash-stack me-2"></i>Final Amount
//                       </span>
//                       <span className="fw-bold text-success fs-3">
//                         {project.payment.currency === "INR" ? "₹" : "$"}
//                         {project.payment.finalAmount?.toFixed(2) || "0.00"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Paid At */}
//                 {project.payment.paidAt && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">
//                       <i className="bi bi-calendar-check"></i> Paid At
//                     </small>
//                     <p className="mb-0 fw-semibold">
//                       {new Date(project.payment.paidAt).toLocaleDateString("en-US", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 )}

//                 {/* Payer Information */}
//                 {project.payment.payer && (
//                   <div className="col-12 mb-3">
//                     <small className="text-muted d-block mb-2">
//                       <i className="bi bi-person-badge"></i> Payer Information
//                     </small>
//                     <div className="p-3 rounded-3 bg-light border">
//                       <div className="row">
//                         <div className="col-md-6 mb-2">
//                           <small className="text-muted">Name</small>
//                           <p className="mb-0 fw-semibold">{project.payment.payer.name}</p>
//                         </div>
//                         <div className="col-md-6 mb-2">
//                           <small className="text-muted">Email</small>
//                           <p className="mb-0 fw-semibold text-break">{project.payment.payer.email}</p>
//                         </div>
//                         <div className="col-md-6">
//                           <small className="text-muted">Payer ID</small>
//                           <p className="mb-0 fw-semibold">{project.payment.payer.payerId}</p>
//                         </div>
//                         <div className="col-md-6">
//                           <small className="text-muted">Country</small>
//                           <p className="mb-0 fw-semibold text-uppercase">{project.payment.payer.country}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Dispute Status */}
//                 {project.payment.dispute && (
//                   <div className="col-12 mb-3">
//                     <div
//                       className={`p-3 rounded-3 text-center ${
//                         project.payment.dispute.isDisputed ? "bg-danger text-white" : "bg-success text-white"
//                       }`}
//                     >
//                       <small className="fw-semibold">
//                         {project.payment.dispute.isDisputed ? "⚠️ Disputed" : "✓ No Disputes"}
//                       </small>
//                     </div>
//                   </div>
//                 )}

//                 {/* 🔥 REFUND BUTTON - Show only if payment is completed and not yet refunded */}
//                 {project.payment.status === "completed" && !project.payment.refund?.isRefunded && (
//                   <div className="col-12 mt-3">
//                     <Button
//                       variant="contained"
//                       color="error"
//                       fullWidth
//                       onClick={handleRefundClick}
//                       startIcon={<i className="bi bi-arrow-counterclockwise"></i>}
//                       sx={{ 
//                         padding: "14px",
//                         fontWeight: "bold",
//                         fontSize: "16px",
//                         borderRadius: "8px",
//                         textTransform: "none",
//                         boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)",
//                         '&:hover': {
//                           boxShadow: "0 6px 16px rgba(220, 53, 69, 0.4)",
//                         }
//                       }}
//                     >
//                       Process Refund via {project.payment.provider === "razorpay" ? "Razorpay" : "PayPal"}
//                     </Button>
//                   </div>
//                 )}

//                 {/* 🔥 REFUND INFO - Show if already refunded */}
//                 {project.payment.refund?.isRefunded && (
//                   <div className="col-12 mt-3">
//                     <div className="alert alert-warning border-2 border-warning shadow-sm" style={{ borderRadius: "12px" }}>
//                       <div className="d-flex align-items-start">
//                         <i className="bi bi-exclamation-triangle-fill text-warning me-3" style={{ fontSize: "28px" }}></i>
//                         <div className="flex-grow-1">
//                           <h6 className="mb-2 fw-bold">
//                             <i className="bi bi-check-circle-fill me-1"></i> Refund Processed
//                           </h6>
//                           <div className="row g-2">
//                             <div className="col-md-6">
//                               <p className="mb-1">
//                                 <strong>Refund Amount:</strong>{" "}
//                                 <span className="text-success fs-5 fw-bold">
//                                   {project.payment.currency === "INR" ? "₹" : "$"}
//                                   {project.payment.refund.refundAmount?.toFixed(2)}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-1">
//                                 <strong>Status:</strong>{" "}
//                                 <span className="badge bg-success text-white">
//                                   {project.payment.refund.refundStatus?.toUpperCase()}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-12">
//                               <p className="mb-1" style={{ fontSize: "13px" }}>
//                                 <strong>Refund ID:</strong> <code>{project.payment.refund.refundId}</code>
//                               </p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-1" style={{ fontSize: "13px" }}>
//                                 <strong>Date:</strong>{" "}
//                                 {new Date(project.payment.refund.refundedAt).toLocaleString("en-US", {
//                                   day: "2-digit",
//                                   month: "short",
//                                   year: "numeric",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 })}
//                               </p>
//                             </div>
//                             {project.payment.refund.refundReason && (
//                               <div className="col-12">
//                                 <p className="mb-0" style={{ fontSize: "13px" }}>
//                                   <strong>Reason:</strong> {project.payment.refund.refundReason}
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Payment History */}
//               {project.payment.history && project.payment.history.length > 0 && (
//                 <div className="mt-4">
//                   <h6 className="text-secondary fw-bold mb-3">
//                     <i className="bi bi-clock-history me-2"></i>Payment History
//                   </h6>
//                   <div className="timeline">
//                     {project.payment.history.map((event, index) => (
//                       <div key={index} className="timeline-item mb-3 pb-3 border-bottom">
//                         <div className="d-flex justify-content-between align-items-start">
//                           <div>
//                             <span
//                               className={`badge ${
//                                 event.status === "completed"
//                                   ? "bg-success"
//                                   : event.status === "pending"
//                                   ? "bg-warning text-dark"
//                                   : event.status === "refunded"
//                                   ? "bg-danger"
//                                   : "bg-secondary"
//                               } mb-2`}
//                               style={{ fontSize: "12px" }}
//                             >
//                               {event.action.toUpperCase()}
//                             </span>
//                             <p className="mb-1 small">
//                               <strong>Amount:</strong> {project.payment.currency === "INR" ? "₹" : "$"}
//                               {event.amount?.toFixed(2)}
//                             </p>
//                             <p className="mb-1 small text-muted">
//                               <strong>Transaction ID:</strong> <code>{event.transactionId}</code>
//                             </p>
//                             {event.reason && (
//                               <p className="mb-1 small text-muted">
//                                 <strong>Reason:</strong> {event.reason}
//                               </p>
//                             )}
//                             <p className="mb-0 small text-muted">
//                               <i className="bi bi-clock me-1"></i>
//                               {new Date(event.timestamp).toLocaleDateString("en-US", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </p>
//                           </div>
//                           <span className="badge bg-light text-dark border">
//                             {event.performedBy}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </Container>

//       {/* ⭐ Rating Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             position: "relative",
//           }}
//         >
//           <button
//             onClick={() => setOpenModal(false)}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               background: "none",
//               border: "none",
//               fontSize: "22px",
//               cursor: "pointer",
//               color: "#555",
//               lineHeight: 1,
//             }}
//             title="Close"
//           >
//             &times;
//           </button>

//           <Typography variant="h6" mb={2} textAlign="center" fontWeight="bold" color="primary">
//             Rate Assistant
//           </Typography>

//           <Box textAlign="center" mb={3}>
//             <Rating
//               count={5}
//               value={ratingValue}
//               onChange={(newValue) => setRatingValue(newValue)}
//               size={40}
//               activeColor="#ffd700"
//             />
//           </Box>

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mb: 3 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ProjectViewPage;







// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ Rating Modal States
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 UNIFIED REFUND HANDLER - Both PayPal & Razorpay
//   const handleRefundClick = async () => {
//     const paymentProvider = project.payment?.provider || "unknown";
//     const paymentId = project.payment?.razorpayPaymentId || project.payment?.paypalOrderId;
//     const maxRefundAmount = project.payment?.finalAmount || 0;
//     const currency = project.payment?.currency || "USD";
//     const currencySymbol = currency === "INR" ? "₹" : "$";

//     // Determine endpoint based on payment provider
//     const refundEndpoint = paymentProvider === "razorpay" 
//       ? `${Url}/api/razorpay/refund-order`
//       : `${Url}/api/paypal/refund-order`;

//     const result = await Swal.fire({
//       title: "Process Refund?",
//       html: `
//         <div style="text-align: left; padding: 15px;">
//           <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0166FF;">
//             <p style="margin: 5px 0;"><strong>Payment Provider:</strong> 
//               <span style="text-transform: uppercase; color: ${paymentProvider === 'razorpay' ? '#0166FF' : '#003087'}; font-weight: 600;">
//                 ${paymentProvider === 'razorpay' ? '💳 RAZORPAY' : '🅿️ PAYPAL'}
//               </span>
//             </p>
//             <p style="margin: 5px 0;"><strong>Project ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${project._id}</code></p>
//             <p style="margin: 5px 0;"><strong>Payment ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${paymentId}</code></p>
//             <p style="margin: 15px 0 5px 0; font-size: 18px;"><strong>Total Amount:</strong> <span style="color: #d9534f; font-size: 24px; font-weight: bold;">${currencySymbol}${maxRefundAmount.toFixed(2)}</span></p>
//           </div>
          
//           <div style="margin-bottom: 15px;">
//             <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//               Refund Amount
//             </label>
//             <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
//               Leave empty for full refund (${currencySymbol}${maxRefundAmount.toFixed(2)})
//             </p>
//             <input 
//               id="refund-amount" 
//               class="swal2-input" 
//               placeholder="Enter custom amount"
//               type="number"
//               step="0.01"
//               min="0.01"
//               max="${maxRefundAmount}"
//               style="width: 100%; margin: 0; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px;"
//             />
//           </div>
          
//           <div>
//             <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//               Reason for Refund
//             </label>
//             <textarea 
//               id="refund-reason" 
//               class="swal2-textarea" 
//               placeholder="Enter refund reason (optional)"
//               style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #ddd; border-radius: 6px; resize: vertical; font-size: 14px;"
//             ></textarea>
//           </div>
//         </div>
//       `,
//       icon: "warning",
//       iconColor: "#ff9800",
//       showCancelButton: true,
//       confirmButtonText: '✓ Process Refund',
//       confirmButtonColor: "#d33",
//       cancelButtonText: '✕ Cancel',
//       cancelButtonColor: "#6c757d",
//       width: "600px",
//       preConfirm: () => {
//         const amount = document.getElementById("refund-amount").value.trim();
//         const reason = document.getElementById("refund-reason").value.trim();

//         if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxRefundAmount)) {
//           Swal.showValidationMessage(
//             `Amount must be between ${currencySymbol}0.01 and ${currencySymbol}${maxRefundAmount.toFixed(2)}`
//           );
//           return false;
//         }

//         return { 
//           amount: amount ? parseFloat(amount) : null, 
//           reason: reason || "Refund requested by admin" 
//         };
//       },
//     });

//     if (result.isConfirmed) {
//       try {
//         Swal.fire({
//           title: "Processing Refund...",
//           html: `
//             <div style="text-align: center; padding: 20px;">
//               <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem; margin-bottom: 15px;">
//                 <span class="visually-hidden">Loading...</span>
//               </div>
//               <p style="font-size: 14px; color: #666; margin: 0;">
//                 Please wait while we process the refund via <strong style="text-transform: uppercase;">${paymentProvider}</strong>
//               </p>
//             </div>
//           `,
//           allowOutsideClick: false,
//           allowEscapeKey: false,
//           showConfirmButton: false,
//         });

//         const response = await axios.post(
//           refundEndpoint,
//           {
//             projectId: project._id,
//             amount: result.value.amount,
//             reason: result.value.reason,
//           },
//           {
//             headers: { authorization: localStorage.getItem("token") },
//           }
//         );

//         const refundedAmount = response.data.amount || result.value.amount || maxRefundAmount;

//         Swal.fire({
//           icon: "success",
//           title: "Refund Successful!",
//           html: `
//             <div style="text-align: left; padding: 15px;">
//               <div style="padding: 15px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 15px;">
//                 <p style="margin: 5px 0;"><strong>Refund ID:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px;">${response.data.refundId}</code></p>
//                 <p style="margin: 5px 0;"><strong>Amount Refunded:</strong> 
//                   <span style="color: #28a745; font-size: 20px; font-weight: bold;">
//                     ${currencySymbol}${refundedAmount.toFixed(2)}
//                   </span>
//                 </p>
//                 <p style="margin: 5px 0;"><strong>Provider:</strong> 
//                   <span style="text-transform: uppercase; font-weight: 600;">
//                     ${paymentProvider}
//                   </span>
//                 </p>
//                 <p style="margin: 5px 0;"><strong>Status:</strong> <span class="badge bg-success">Processed</span></p>
//               </div>
              
//               <p style="font-size: 13px; color: #666; margin: 0; text-align: center;">
//                 The refund will be credited within 5-7 business days
//               </p>
//             </div>
//           `,
//           confirmButtonText: "OK",
//           confirmButtonColor: "#28a745",
//           width: "550px",
//         });

//         // Refresh project data
//         await projectDetailsFunc();

//       } catch (error) {
//         console.error("Refund Error:", error);
        
//         const errorMessage = error.response?.data?.message || "Refund failed";
//         const errorDetails = error.response?.data?.details || 
//                             error.response?.data?.error || 
//                             error.message;

//         Swal.fire({
//           icon: "error",
//           title: "Refund Failed",
//           html: `
//             <div style="text-align: left; padding: 15px;">
//               <div style="background: #f8d7da; padding: 15px; border-radius: 8px; border-left: 4px solid #d9534f;">
//                 <p style="margin: 0 0 10px 0; font-weight: bold; color: #721c24;">
//                   ${errorMessage}
//                 </p>
//                 ${errorDetails ? `
//                   <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 10px;">
//                     <p style="margin: 0; font-size: 13px; color: #666; font-family: monospace;">
//                       ${errorDetails}
//                     </p>
//                   </div>
//                 ` : ''}
//               </div>
//               <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; text-align: center;">
//                 If the issue persists, please contact support.
//               </p>
//             </div>
//           `,
//           confirmButtonText: "OK",
//           confirmButtonColor: "#d33",
//           width: "550px",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   // ⚡ Find if this assistant already rated
//   const assistantRating = ratingAllData?.find(
//     (r) =>
//       r.projectId === project?._id &&
//       r.employ === project?.team?.assistant?.staffId
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Project View </title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold text-primary">
//             Project Details
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <div className="project-details-box rounded-top p-4 shadow-sm">
//           <div className="text-end mb-3 fw-medium">
//             <span className="text-primary">Project Status :</span> {project?.projectStatus}
//           </div>

//           <div className="row g-4">
//             <div className="col-lg-6 col-md-12">
//               <div className="custom-info-card p-4 rounded-4 shadow-sm bg-white border">
//                 <h5 className="text-primary fw-bold mb-3">
//                   <i className="bi bi-folder2-open me-2"></i>Project Details
//                 </h5>
//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Package</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.projectType === "package" && packageAllData.length > 0
//                         ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                         : "Custom Package"}
//                     </p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client Name</small>
//                     <p className="mb-0 fw-semibold">{project?.clientName}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Project ID</small>
//                     <p className="mb-0 fw-semibold">{project?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Client ID</small>
//                     <p className="mb-0 fw-semibold">{project?.clientId?._id}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Pricing</small>
//                     <p className="mb-0 text-success fw-bold">${project?.totalPrice}</p>
//                   </div>
//                   <div className="col-6 mb-3">
//                     <small className="text-muted">Initiated</small>
//                     <p className="mb-0 fw-semibold">
//                       {project?.startAt && formatDateFunc(project.startAt)}
//                     </p>
//                   </div>

//                   {teamAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Team Allotted</small>
//                       <p className="mb-0">{teamAtDate}</p>
//                     </div>
//                   )}
//                   {startAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Project Start</small>
//                       <p className="mb-0">{startAtDate}</p>
//                     </div>
//                   )}
//                   {expireAtDate && (
//                     <div className="col-6 mb-3">
//                       <small className="text-muted">Expire Date</small>
//                       <p className="mb-0 text-danger fw-medium">{expireAtDate}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-6 col-12">
//               <h5 className="text-primary mb-3">Services</h5>
//               <div className="border rounded-4 shadow-sm p-3 bg-white">
//                 {project?.service?.map((serviceValue) => (
//                   <div key={serviceValue.serviceId} className="border-bottom pb-2 mb-3">
//                     <h6 className="text-capitalize fw-bold d-flex align-items-center justify-content-between">
//                       {serviceValue.serviceName}
//                       <span className="ms-2">
//                         <span
//                           className={`status-badge ${
//                             project.projectStatus === "completed"
//                               ? "bg-success"
//                               : project.projectStatus === "running"
//                               ? "bg-primary"
//                               : "bg-warning"
//                           }`}
//                         >
//                         </span>
//                       </span>
//                     </h6>
//                     <small className="text-muted">
//                       {serviceValue?.serviceStart &&
//                         `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}`}
//                     </small>
//                     <p className="mb-0">{serviceValue?.brief}</p>
//                     {project.team?.team?.some(
//                       (member) => member.staffId?.source === "Freelancer"
//                     ) && (
//                       <p>
//                         <strong>Freelancer Price :</strong> ${serviceValue.freelancerPrice}
//                       </p>
//                     )}
//                     <p className="text-capitalize fw-bold">Company Price : ${serviceValue?.price}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* TEAM SECTION */}
//       <Container className="mb-4">
//         <section className="card p-4 shadow-sm">
//           {project?.team ? (
//             <div className="table-responsive">
//               <table className="table table-striped align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Role</th>
//                     <th>Name</th>
//                     <th>Source</th>
//                     <th>Profile</th>
//                     <th>Rate Assistant ⭐</th>
//                     <th>Customer Rating ⭐</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Assistant Row */}
//                   <tr>
//                     <td>{project.team.assistant?.role || "—"}</td>
//                     <td>{project.team.assistant?.staffName || "—"}</td>
//                     <td>
//                       {project.team.assistant?.source
//                         ? project.team.assistant.source
//                         : "Internal"}
//                     </td>
//                     <td>
//                       <Link className="btn btn-sm btn-outline-primary">Profile View</Link>
//                     </td>
//                     <td>
//                       {assistantRating ? (
//                         <div className="text-center">
//                           <Rating
//                             count={5}
//                             value={assistantRating.ratingStar}
//                             size={24}
//                             edit={false}
//                             activeColor="#ff6c00"
//                           />
//                           <p className="small text-muted mb-0">
//                             {assistantRating.ratingStar} / 5
//                           </p>
//                         </div>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           color="warning"
//                           size="small"
//                           onClick={handleOpen}
//                         >
//                           Rate Assistant ⭐
//                         </Button>
//                       )}
//                     </td>
//                     <td>—</td>
//                   </tr>

//                   {/* Other Team Members */}
//                   {project.team.team?.map((member, i) => {
//                     const memberRatings = ratingAllData?.filter(
//                       (r) => r.projectId === project?._id && r.employ === member.staffId
//                     );

//                     return (
//                       <tr key={i}>
//                         <td>{member.role}</td>
//                         <td>{member.staffName}</td>
//                         <td>{member.staffId?.source || "Internal"}</td>
//                         <td>
//                           <Link className="btn btn-sm btn-outline-primary">
//                             Profile View
//                           </Link>
//                         </td>
//                         <td>—</td>
//                         <td>
//                           {memberRatings?.length > 0 ? (
//                             memberRatings.map((r, idx) => (
//                               <div key={idx} className="text-center">
//                                 <Rating
//                                   count={5}
//                                   value={r.ratingStar}
//                                   size={24}
//                                   edit={false}
//                                   activeColor="#ff6c00"
//                                 />
//                                 <p className="small text-muted mb-0">
//                                   {r.ratingStar} / 5
//                                 </p>
//                               </div>
//                             ))
//                           ) : (
//                             <span className="text-muted">No ratings yet</span>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : null}
//         </section>

//         {/* 💳 PAYMENT DETAILS SECTION - ALL DETAILS INCLUDED */}
//         {project?.payment && (
//           <div className="col-lg-12 col-md-12 mb-4 mt-5">
//             <div className="card p-4 shadow-sm border-0" style={{ borderRadius: "12px" }}>
//               {/* Header */}
//               <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
//                 <h5 className="mb-0 fw-bold" style={{ color: "#212529" }}>
//                   <i className="bi bi-credit-card me-2"></i>Payment Details
//                 </h5>
//                 {project.payment.provider && (
//                   <span style={{
//                     padding: "6px 16px",
//                     borderRadius: "20px",
//                     fontSize: "13px",
//                     fontWeight: "600",
//                     textTransform: "uppercase",
//                     background: project.payment.provider === "razorpay" ? "#0166FF" : "#003087",
//                     color: "white"
//                   }}>
//                     {project.payment.provider === "razorpay" ? "💳 Razorpay" : "🅿️ PayPal"}
//                   </span>
//                 )}
//               </div>

//               <div className="row">
//                 {/* Payment Status */}
//                 <div className="col-12 mb-3">
//                   <div
//                     className="d-flex justify-content-between align-items-center p-3 rounded"
//                     style={{ 
//                       backgroundColor: project.payment.status === "completed" ? "#d1f4e0" : "#fff3cd",
//                       border: `1px solid ${project.payment.status === "completed" ? "#28a745" : "#ffc107"}`
//                     }}
//                   >
//                     <span className="fw-semibold">Payment Status</span>
//                     <span
//                       className={`badge ${
//                         project.payment.status === "completed" ? "bg-success" : "bg-warning text-dark"
//                       }`}
//                       style={{ padding: "6px 12px", fontSize: "12px" }}
//                     >
//                       {project.payment.status.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Invoice Number & Date */}
//                 {project.payment.invoiceNumber && (
//                   <>
//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">Invoice Number</small>
//                       <p className="mb-0 fw-semibold">{project.payment.invoiceNumber}</p>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">Invoice Date</small>
//                       <p className="mb-0 fw-semibold">{project.payment.invoiceDate}</p>
//                     </div>
//                   </>
//                 )}

//                 {/* Transaction ID */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">Transaction ID</small>
//                   <p className="mb-0 fw-semibold text-break" style={{ fontSize: "13px", fontFamily: "monospace" }}>
//                     {project.payment.transactionId || "—"}
//                   </p>
//                 </div>

//                 {/* Order ID */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">
//                     {project.payment.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
//                   </small>
//                   <p className="mb-0 fw-semibold text-break" style={{ fontSize: "13px", fontFamily: "monospace" }}>
//                     {project.payment.razorpayOrderId || project.payment.paypalOrderId || "—"}
//                   </p>
//                 </div>

//                 {/* Payment Provider */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">Payment Provider</small>
//                   <p className="mb-0 fw-semibold text-capitalize">
//                     {project.payment.provider || "—"}
//                   </p>
//                 </div>

//                 {/* Currency */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">Currency</small>
//                   <p className="mb-0">
//                     <span className="badge bg-info text-dark">{project.payment.currency || "USD"}</span>
//                   </p>
//                 </div>

//                 {/* Subtotal */}
//                 <div className="col-md-6 mb-3">
//                   <small className="text-muted d-block mb-1">Subtotal</small>
//                   <p className="mb-0 fw-bold text-dark">
//                     {project.payment.currency === "INR" ? "₹" : "$"}
//                     {project.payment.subtotal?.toFixed(2) || "0.00"}
//                   </p>
//                 </div>

//                 {/* Discount Amount */}
//                 {project.payment.discountAmount > 0 && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">Discount Applied</small>
//                     <p className="mb-0 fw-bold text-success">
//                       -{project.payment.currency === "INR" ? "₹" : "$"}
//                       {project.payment.discountAmount?.toFixed(2)}
//                     </p>
//                   </div>
//                 )}

//                 {/* Coupon Code */}
//                 {project.payment.couponCode && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">Coupon Code</small>
//                     <p className="mb-0">
//                       <span className="badge bg-info text-dark px-3 py-2">
//                         {project.payment.couponCode}
//                       </span>
//                     </p>
//                   </div>
//                 )}

//                 {/* Tax Breakdown (for Razorpay/India) */}
//                 {project.payment.taxBreakdown && (
//                   <>
//                     <div className="col-12 mb-3 mt-2">
//                       <h6 className="fw-bold text-secondary mb-3">Tax Breakdown</h6>
//                     </div>
                    
//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">Subtotal (Before Tax)</small>
//                       <p className="mb-0 fw-semibold">
//                         ₹{project.payment.taxBreakdown.subtotal?.toFixed(2) || "0.00"}
//                       </p>
//                     </div>

//                     {project.payment.taxBreakdown.isDelhi ? (
//                       <>
//                         <div className="col-md-6 mb-3">
//                           <small className="text-muted d-block mb-1">CGST @ 9%</small>
//                           <p className="mb-0 fw-semibold">
//                             ₹{project.payment.taxBreakdown.cgst?.toFixed(2) || "0.00"}
//                           </p>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <small className="text-muted d-block mb-1">SGST @ 9%</small>
//                           <p className="mb-0 fw-semibold">
//                             ₹{project.payment.taxBreakdown.sgst?.toFixed(2) || "0.00"}
//                           </p>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="col-md-6 mb-3">
//                         <small className="text-muted d-block mb-1">IGST @ 18%</small>
//                         <p className="mb-0 fw-semibold">
//                           ₹{project.payment.taxBreakdown.igst?.toFixed(2) || "0.00"}
//                         </p>
//                       </div>
//                     )}

//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">Total Tax</small>
//                       <p className="mb-0 fw-bold text-primary">
//                         ₹{project.payment.taxBreakdown.totalTax?.toFixed(2) || "0.00"}
//                       </p>
//                     </div>
//                   </>
//                 )}

//                 {/* Company & GST Details */}
//                 {(project.payment.companyName || project.payment.gstNumber) && (
//                   <>
//                     <div className="col-12 mb-3 mt-2">
//                       <h6 className="fw-bold text-secondary mb-3">Business Details</h6>
//                     </div>
                    
//                     {project.payment.companyName && (
//                       <div className="col-md-6 mb-3">
//                         <small className="text-muted d-block mb-1">Company Name</small>
//                         <p className="mb-0 fw-semibold">{project.payment.companyName}</p>
//                       </div>
//                     )}

//                     {project.payment.gstNumber && (
//                       <div className="col-md-6 mb-3">
//                         <small className="text-muted d-block mb-1">GST Number</small>
//                         <p className="mb-0 fw-semibold">{project.payment.gstNumber}</p>
//                       </div>
//                     )}

//                     {project.payment.gstStateCode && (
//                       <div className="col-md-6 mb-3">
//                         <small className="text-muted d-block mb-1">GST State Code</small>
//                         <p className="mb-0 fw-semibold">{project.payment.gstStateCode}</p>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Client Address */}
//                 {project.payment.clientAddress && (
//                   <>
//                     <div className="col-12 mb-3 mt-2">
//                       <h6 className="fw-bold text-secondary mb-3">Billing Address</h6>
//                     </div>
                    
//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">Address</small>
//                       <p className="mb-0 fw-semibold">{project.payment.clientAddress}</p>
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">City</small>
//                       <p className="mb-0 fw-semibold">{project.payment.clientCity}</p>
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">State</small>
//                       <p className="mb-0 fw-semibold">{project.payment.clientState}</p>
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">Pincode</small>
//                       <p className="mb-0 fw-semibold">{project.payment.clientPincode}</p>
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <small className="text-muted d-block mb-1">Country</small>
//                       <p className="mb-0 fw-semibold">{project.payment.clientCountry}</p>
//                     </div>
//                   </>
//                 )}

//                 {/* Conversion Rate (for Razorpay) */}
//                 {project.payment.conversionRate && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">Conversion Rate</small>
//                     <p className="mb-0 fw-semibold">
//                       $1 = ₹{project.payment.conversionRate?.toFixed(2)}
//                     </p>
//                   </div>
//                 )}

//                 {/* Final Amount USD (for Razorpay) */}
//                 {project.payment.finalAmountUSD && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">Amount in USD</small>
//                     <p className="mb-0 fw-bold text-success">
//                       ${project.payment.finalAmountUSD?.toFixed(2)}
//                     </p>
//                   </div>
//                 )}

//                 {/* Final Amount */}
//                 <div className="col-12 mb-3 mt-2">
//                   <div className="p-3 rounded" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span className="fw-bold fs-5" style={{ color: "white" }}>Final Amount</span>
//                       <span className="fw-bold fs-3" style={{ color: "white" }}>
//                         {project.payment.currency === "INR" ? "₹" : "$"}
//                         {project.payment.finalAmount?.toFixed(2) || "0.00"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Paid At */}
//                 {project.payment.paidAt && (
//                   <div className="col-md-6 mb-3">
//                     <small className="text-muted d-block mb-1">Paid At</small>
//                     <p className="mb-0 fw-semibold">
//                       {new Date(project.payment.paidAt).toLocaleDateString("en-US", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 )}

//                 {/* Payer Information */}
//                 {project.payment.payer && (
//                   <>
//                     <div className="col-12 mb-3 mt-3">
//                       <h6 className="fw-bold text-secondary mb-3">Payer Information</h6>
//                     </div>
//                     <div className="col-12 mb-3">
//                       <div className="p-3 rounded bg-light border">
//                         <div className="row">
//                           <div className="col-md-6 mb-2">
//                             <small className="text-muted">Name</small>
//                             <p className="mb-0 fw-semibold">{project.payment.payer.name}</p>
//                           </div>
//                           <div className="col-md-6 mb-2">
//                             <small className="text-muted">Email</small>
//                             <p className="mb-0 fw-semibold text-break">{project.payment.payer.email}</p>
//                           </div>
//                           <div className="col-md-6">
//                             <small className="text-muted">Payer ID</small>
//                             <p className="mb-0 fw-semibold">{project.payment.payer.payerId}</p>
//                           </div>
//                           <div className="col-md-6">
//                             <small className="text-muted">Country</small>
//                             <p className="mb-0 fw-semibold text-uppercase">{project.payment.payer.country}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 {/* Dispute Status */}
//                 {project.payment.dispute && (
//                   <div className="col-12 mb-3">
//                     <div
//                       className={`p-2 rounded text-center ${
//                         project.payment.dispute.isDisputed ? "bg-danger text-white" : "bg-success text-white"
//                       }`}
//                     >
//                       <small className="fw-semibold">
//                         {project.payment.dispute.isDisputed ? "⚠️ Disputed" : "✓ No Disputes"}
//                       </small>
//                     </div>
//                   </div>
//                 )}

//                 {/* 🔥 REFUND BUTTON */}
//                 {project.payment.status === "completed" && !project.payment.refund?.isRefunded && (
//                   <div className="col-12 mt-3">
//                     <Button
//                       variant="contained"
//                       color="error"
//                       fullWidth
//                       onClick={handleRefundClick}
//                       startIcon={<i className="bi bi-arrow-counterclockwise"></i>}
//                       sx={{ 
//                         padding: "12px",
//                         fontWeight: "600",
//                         fontSize: "15px",
//                         borderRadius: "8px",
//                         textTransform: "none",
//                       }}
//                     >
//                       Process Refund via {project.payment.provider === "razorpay" ? "Razorpay" : "PayPal"}
//                     </Button>
//                   </div>
//                 )}

//                 {/* 🔥 REFUND INFO */}
//                 {project.payment.refund?.isRefunded && (
//                   <div className="col-12 mt-3">
//                     <div className="alert alert-warning border-warning shadow-sm">
//                       <h6 className="mb-2 fw-bold">
//                         <i className="bi bi-check-circle-fill me-1"></i> Refund Processed
//                       </h6>
//                       <div className="row g-2">
//                         <div className="col-md-6">
//                           <p className="mb-1">
//                             <strong>Refund Amount:</strong>{" "}
//                             <span className="text-success fs-5 fw-bold">
//                               {project.payment.currency === "INR" ? "₹" : "$"}
//                               {project.payment.refund.refundAmount?.toFixed(2)}
//                             </span>
//                           </p>
//                         </div>
//                         <div className="col-md-6">
//                           <p className="mb-1">
//                             <strong>Status:</strong>{" "}
//                             <span className="badge bg-success">
//                               {project.payment.refund.refundStatus?.toUpperCase()}
//                             </span>
//                           </p>
//                         </div>
//                         <div className="col-12">
//                           <p className="mb-1" style={{ fontSize: "13px" }}>
//                             <strong>Refund ID:</strong> <code>{project.payment.refund.refundId}</code>
//                           </p>
//                         </div>
//                         <div className="col-md-6">
//                           <p className="mb-1" style={{ fontSize: "13px" }}>
//                             <strong>Date:</strong>{" "}
//                             {new Date(project.payment.refund.refundedAt).toLocaleString("en-US", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </p>
//                         </div>
//                         {project.payment.refund.refundReason && (
//                           <div className="col-12">
//                             <p className="mb-0" style={{ fontSize: "13px" }}>
//                               <strong>Reason:</strong> {project.payment.refund.refundReason}
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Payment History */}
//               {project.payment.history && project.payment.history.length > 0 && (
//                 <div className="mt-4 pt-4 border-top">
//                   <h6 className="fw-bold text-secondary mb-3">
//                     <i className="bi bi-clock-history me-2"></i>Payment History
//                   </h6>
//                   <div>
//                     {project.payment.history.map((event, index) => (
//                       <div key={index} className="mb-3 pb-3 border-bottom">
//                         <div className="d-flex justify-content-between align-items-start">
//                           <div>
//                             <span
//                               className={`badge ${
//                                 event.status === "completed"
//                                   ? "bg-success"
//                                   : event.status === "pending"
//                                   ? "bg-warning text-dark"
//                                   : event.status === "refunded"
//                                   ? "bg-danger"
//                                   : "bg-secondary"
//                               } mb-1`}
//                             >
//                               {event.action.toUpperCase()}
//                             </span>
//                             <p className="mb-1 small">
//                               <strong>Amount:</strong> {project.payment.currency === "INR" ? "₹" : "$"}
//                               {event.amount?.toFixed(2)}
//                             </p>
//                             <p className="mb-1 small text-muted">
//                               <strong>Transaction ID:</strong> <code>{event.transactionId}</code>
//                             </p>
//                             {event.reason && (
//                               <p className="mb-1 small text-muted">
//                                 <strong>Reason:</strong> {event.reason}
//                               </p>
//                             )}
//                             <p className="mb-0 small text-muted">
//                               {new Date(event.timestamp).toLocaleDateString("en-US", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </p>
//                           </div>
//                           <span className="badge bg-light text-dark border">
//                             {event.performedBy}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </Container>

//       {/* ⭐ Rating Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             position: "relative",
//           }}
//         >
//           <button
//             onClick={() => setOpenModal(false)}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               background: "none",
//               border: "none",
//               fontSize: "22px",
//               cursor: "pointer",
//               color: "#555",
//               lineHeight: 1,
//             }}
//             title="Close"
//           >
//             &times;
//           </button>

//           <Typography variant="h6" mb={2} textAlign="center" fontWeight="bold" color="primary">
//             Rate Assistant
//           </Typography>

//           <Box textAlign="center" mb={3}>
//             <Rating
//               count={5}
//               value={ratingValue}
//               onChange={(newValue) => setRatingValue(newValue)}
//               size={40}
//               activeColor="#ffd700"
//             />
//           </Box>

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mb: 3 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ProjectViewPage;











// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ Rating Modal States
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 UNIFIED REFUND HANDLER
//   // const handleRefundClick = async () => {
//   //   const paymentProvider = project.payment?.provider || "unknown";
//   //   const paymentId = project.payment?.razorpayPaymentId || project.payment?.paypalOrderId;
//   //   const maxRefundAmount = project.payment?.finalAmount || 0;
//   //   const currency = project.payment?.currency || "USD";
//   //   const currencySymbol = currency === "INR" ? "₹" : "$";

//   //   const refundEndpoint = paymentProvider === "razorpay" 
//   //     ? `${Url}/api/razorpay/refund-order`
//   //     : `${Url}/api/paypal/refund-order`;

//   //   const result = await Swal.fire({
//   //     title: "Process Refund?",
//   //     html: `
//   //       <div style="text-align: left; padding: 15px;">
//   //         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0166FF;">
//   //           <p style="margin: 5px 0;"><strong>Payment Provider:</strong> 
//   //             <span style="text-transform: uppercase; color: ${paymentProvider === 'razorpay' ? '#0166FF' : '#003087'}; font-weight: 600;">
//   //               ${paymentProvider === 'razorpay' ? '💳 RAZORPAY' : '🅿️ PAYPAL'}
//   //             </span>
//   //           </p>
//   //           <p style="margin: 5px 0;"><strong>Project ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${project._id}</code></p>
//   //           <p style="margin: 5px 0;"><strong>Payment ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${paymentId}</code></p>
//   //           <p style="margin: 15px 0 5px 0; font-size: 18px;"><strong>Total Amount:</strong> <span style="color: #d9534f; font-size: 24px; font-weight: bold;">${currencySymbol}${maxRefundAmount.toFixed(2)}</span></p>
//   //         </div>
          
//   //         <div style="margin-bottom: 15px;">
//   //           <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//   //             Refund Amount
//   //           </label>
//   //           <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
//   //             Leave empty for full refund (${currencySymbol}${maxRefundAmount.toFixed(2)})
//   //           </p>
//   //           <input 
//   //             id="refund-amount" 
//   //             class="swal2-input" 
//   //             placeholder="Enter custom amount"
//   //             type="number"
//   //             step="0.01"
//   //             min="0.01"
//   //             max="${maxRefundAmount}"
//   //             style="width: 100%; margin: 0; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px;"
//   //           />
//   //         </div>
          
//   //         <div>
//   //           <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//   //             Reason for Refund
//   //           </label>
//   //           <textarea 
//   //             id="refund-reason" 
//   //             class="swal2-textarea" 
//   //             placeholder="Enter refund reason (optional)"
//   //             style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #ddd; border-radius: 6px; resize: vertical; font-size: 14px;"
//   //           ></textarea>
//   //         </div>
//   //       </div>
//   //     `,
//   //     icon: "warning",
//   //     iconColor: "#ff9800",
//   //     showCancelButton: true,
//   //     confirmButtonText: '✓ Process Refund',
//   //     confirmButtonColor: "#d33",
//   //     cancelButtonText: '✕ Cancel',
//   //     cancelButtonColor: "#6c757d",
//   //     width: "600px",
//   //     preConfirm: () => {
//   //       const amount = document.getElementById("refund-amount").value.trim();
//   //       const reason = document.getElementById("refund-reason").value.trim();

//   //       if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxRefundAmount)) {
//   //         Swal.showValidationMessage(
//   //           `Amount must be between ${currencySymbol}0.01 and ${currencySymbol}${maxRefundAmount.toFixed(2)}`
//   //         );
//   //         return false;
//   //       }

//   //       return { 
//   //         amount: amount ? parseFloat(amount) : null, 
//   //         reason: reason || "Refund requested by admin" 
//   //       };
//   //     },
//   //   });

//   //   if (result.isConfirmed) {
//   //     try {
//   //       Swal.fire({
//   //         title: "Processing Refund...",
//   //         html: `
//   //           <div style="text-align: center; padding: 20px;">
//   //             <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem; margin-bottom: 15px;">
//   //               <span class="visually-hidden">Loading...</span>
//   //             </div>
//   //             <p style="font-size: 14px; color: #666; margin: 0;">
//   //               Please wait while we process the refund via <strong style="text-transform: uppercase;">${paymentProvider}</strong>
//   //             </p>
//   //           </div>
//   //         `,
//   //         allowOutsideClick: false,
//   //         allowEscapeKey: false,
//   //         showConfirmButton: false,
//   //       });

//   //       const response = await axios.post(
//   //         refundEndpoint,
//   //         {
//   //           projectId: project._id,
//   //           amount: result.value.amount,
//   //           reason: result.value.reason,
//   //         },
//   //         {
//   //           headers: { authorization: localStorage.getItem("token") },
//   //         }
//   //       );

//   //       const refundedAmount = response.data.amount || result.value.amount || maxRefundAmount;

//   //       Swal.fire({
//   //         icon: "success",
//   //         title: "Refund Successful!",
//   //         html: `
//   //           <div style="text-align: left; padding: 15px;">
//   //             <div style="padding: 15px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 15px;">
//   //               <p style="margin: 5px 0;"><strong>Refund ID:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px;">${response.data.refundId}</code></p>
//   //               <p style="margin: 5px 0;"><strong>Amount Refunded:</strong> 
//   //                 <span style="color: #28a745; font-size: 20px; font-weight: bold;">
//   //                   ${currencySymbol}${refundedAmount.toFixed(2)}
//   //                 </span>
//   //               </p>
//   //               <p style="margin: 5px 0;"><strong>Provider:</strong> 
//   //                 <span style="text-transform: uppercase; font-weight: 600;">
//   //                   ${paymentProvider}
//   //                 </span>
//   //               </p>
//   //               <p style="margin: 5px 0;"><strong>Status:</strong> <span class="badge bg-success">Processed</span></p>
//   //             </div>
              
//   //             <p style="font-size: 13px; color: #666; margin: 0; text-align: center;">
//   //               The refund will be credited within 5-7 business days
//   //             </p>
//   //           </div>
//   //         `,
//   //         confirmButtonText: "OK",
//   //         confirmButtonColor: "#28a745",
//   //         width: "550px",
//   //       });

//   //       await projectDetailsFunc();

//   //     } catch (error) {
//   //       console.error("Refund Error:", error);
        
//   //       const errorMessage = error.response?.data?.message || "Refund failed";
//   //       const errorDetails = error.response?.data?.details || 
//   //                           error.response?.data?.error || 
//   //                           error.message;

//   //       Swal.fire({
//   //         icon: "error",
//   //         title: "Refund Failed",
//   //         html: `
//   //           <div style="text-align: left; padding: 15px;">
//   //             <div style="background: #f8d7da; padding: 15px; border-radius: 8px; border-left: 4px solid #d9534f;">
//   //               <p style="margin: 0 0 10px 0; font-weight: bold; color: #721c24;">
//   //                 ${errorMessage}
//   //               </p>
//   //               ${errorDetails ? `
//   //                 <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 10px;">
//   //                   <p style="margin: 0; font-size: 13px; color: #666; font-family: monospace;">
//   //                     ${errorDetails}
//   //                   </p>
//   //                 </div>
//   //               ` : ''}
//   //             </div>
//   //             <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; text-align: center;">
//   //               If the issue persists, please contact support.
//   //             </p>
//   //           </div>
//   //         `,
//   //         confirmButtonText: "OK",
//   //         confirmButtonColor: "#d33",
//   //         width: "550px",
//   //       });
//   //     }
//   //   }
//   // };






// // 🔥 UNIFIED REFUND HANDLER
// const handleRefundClick = async () => {
//   const paymentProvider = project.payment?.provider || "unknown";
//   const paymentId = project.payment?.razorpayPaymentId || project.payment?.paypalOrderId;
//   const maxRefundAmount = project.payment?.finalAmount || 0; // ✅ Ye already INR mein hai
//   const currency = project.payment?.currency || "USD";
//   const currencySymbol = currency === "INR" ? "₹" : "$";

//   const refundEndpoint = paymentProvider === "razorpay" 
//     ? `${Url}/api/razorpay/refund-order`
//     : `${Url}/paypal/refund-order`;

//   const result = await Swal.fire({
//     title: "Process Refund?",
//     html: `
//       <div style="text-align: left; padding: 15px;">
//         <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0166FF;">
//           <p style="margin: 5px 0;"><strong>Payment Provider:</strong> 
//             <span style="text-transform: uppercase; color: ${paymentProvider === 'razorpay' ? '#0166FF' : '#003087'}; font-weight: 600;">
//               ${paymentProvider === 'razorpay' ? '💳 RAZORPAY' : '🅿️ PAYPAL'}
//             </span>
//           </p>
//           <p style="margin: 5px 0;"><strong>Project ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${project._id}</code></p>
//           <p style="margin: 5px 0;"><strong>Payment ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${paymentId}</code></p>
//           <p style="margin: 15px 0 5px 0; font-size: 18px;"><strong>Total Amount:</strong> <span style="color: #d9534f; font-size: 24px; font-weight: bold;">${currencySymbol}${maxRefundAmount.toFixed(2)}</span></p>
//         </div>
        
//         <div style="margin-bottom: 15px;">
//           <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//             Refund Amount (in ${currency}) 
//           </label>
//           <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
//             Leave empty for full refund (${currencySymbol}${maxRefundAmount.toFixed(2)})
//           </p>
//           <input 
//             id="refund-amount" 
//             class="swal2-input" 
//             placeholder="Enter amount in ${currency}"
//             type="number"
//             step="0.01"
//             min="0.01"
//             max="${maxRefundAmount}"
//             style="width: 100%; margin: 0; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px;"
//           />
//         </div>
        
//         <div>
//           <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//             Reason for Refund
//           </label>
//           <textarea 
//             id="refund-reason" 
//             class="swal2-textarea" 
//             placeholder="Enter refund reason (optional)"
//             style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #ddd; border-radius: 6px; resize: vertical; font-size: 14px;"
//           ></textarea>
//         </div>
//       </div>
//     `,
//     icon: "warning",
//     iconColor: "#ff9800",
//     showCancelButton: true,
//     confirmButtonText: '✓ Process Refund',
//     confirmButtonColor: "#d33",
//     cancelButtonText: '✕ Cancel',
//     cancelButtonColor: "#6c757d",
//     width: "600px",
//     preConfirm: () => {
//       const amount = document.getElementById("refund-amount").value.trim();
//       const reason = document.getElementById("refund-reason").value.trim();

//       if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxRefundAmount)) {
//         Swal.showValidationMessage(
//           `Amount must be between ${currencySymbol}0.01 and ${currencySymbol}${maxRefundAmount.toFixed(2)}`
//         );
//         return false;
//       }

//       return { 
//         amount: amount ? parseFloat(amount) : null, // ✅ Amount INR mein jayega
//         reason: reason || "Refund requested by admin" 
//       };
//     },
//   });

//   if (result.isConfirmed) {
//     try {
//       Swal.fire({
//         title: "Processing Refund...",
//         html: `
//           <div style="text-align: center; padding: 20px;">
//             <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem; margin-bottom: 15px;">
//               <span class="visually-hidden">Loading...</span>
//             </div>
//             <p style="font-size: 14px; color: #666; margin: 0;">
//               Please wait while we process the refund via <strong style="text-transform: uppercase;">${paymentProvider}</strong>
//             </p>
//           </div>
//         `,
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//         showConfirmButton: false,
//       });

//       const response = await axios.post(
//         refundEndpoint,
//         {
//           projectId: project._id,
//           amount: result.value.amount, // ✅ INR amount backend jayega
//           reason: result.value.reason,
//         },
//         {
//           headers: { authorization: localStorage.getItem("token") },
//         }
//       );

//       const refundedAmount = response.data.amount || result.value.amount || maxRefundAmount;

//       Swal.fire({
//         icon: "success",
//         title: "Refund Successful!",
//         html: `
//           <div style="text-align: left; padding: 15px;">
//             <div style="padding: 15px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 15px;">
//               <p style="margin: 5px 0;"><strong>Refund ID:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px;">${response.data.refundId}</code></p>
//               <p style="margin: 5px 0;"><strong>Amount Refunded:</strong> 
//                 <span style="color: #28a745; font-size: 20px; font-weight: bold;">
//                   ${currencySymbol}${refundedAmount.toFixed(2)}
//                 </span>
//               </p>
//               <p style="margin: 5px 0;"><strong>Provider:</strong> 
//                 <span style="text-transform: uppercase; font-weight: 600;">
//                   ${paymentProvider}
//                 </span>
//               </p>
//               <p style="margin: 5px 0;"><strong>Status:</strong> <span class="badge bg-success">Processed</span></p>
//             </div>
            
//             <p style="font-size: 13px; color: #666; margin: 0; text-align: center;">
//               The refund will be credited within 5-7 business days
//             </p>
//           </div>
//         `,
//         confirmButtonText: "OK",
//         confirmButtonColor: "#28a745",
//         width: "550px",
//       });

//       await projectDetailsFunc();

//     } catch (error) {
//       console.error("Refund Error:", error);
      
//       const errorMessage = error.response?.data?.message || "Refund failed";
//       const errorDetails = error.response?.data?.details || 
//                           error.response?.data?.error || 
//                           error.message;

//       Swal.fire({
//         icon: "error",
//         title: "Refund Failed",
//         html: `
//           <div style="text-align: left; padding: 15px;">
//             <div style="background: #f8d7da; padding: 15px; border-radius: 8px; border-left: 4px solid #d9534f;">
//               <p style="margin: 0 0 10px 0; font-weight: bold; color: #721c24;">
//                 ${errorMessage}
//               </p>
//               ${errorDetails ? `
//                 <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 10px;">
//                   <p style="margin: 0; font-size: 13px; color: #666; font-family: monospace;">
//                     ${errorDetails}
//                   </p>
//                 </div>
//               ` : ''}
//             </div>
//             <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; text-align: center;">
//               If the issue persists, please contact support.
//             </p>
//           </div>
//         `,
//         confirmButtonText: "OK",
//         confirmButtonColor: "#d33",
//         width: "550px",
//       });
//     }
//   }
// };














//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   const assistantRating = ratingAllData?.find(
//     (r) =>
//       r.projectId === project?._id &&
//       r.employ === project?.team?.assistant?.staffId
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project View</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold">
//             Project Details
//           </Typography>
//           <span className={`badge ${
//             project?.projectStatus === 'refunded' ? 'bg-danger' :
//             project?.projectStatus === 'completed' ? 'bg-success' :
//             project?.projectStatus === 'running' ? 'bg-primary' : 'bg-warning'
//           } px-3 py-2 fs-6 text-uppercase`}>
//             {project?.projectStatus}
//           </span>
//         </Stack>
//       </Container>

//       {/* PROJECT DETAILS TABLE */}
//       <Container className="mb-4">
//         <div className="card shadow-sm">
//           <div className="card-header bg-primary text-white">
//             <h5 className="mb-0"><i className="bi bi-folder2-open me-2"></i>Project Information</h5>
//           </div>
//           <div className="card-body p-0">
//             <table className="table table-borderless mb-0">
//               <tbody>
//                 <tr>
//                   <td className="fw-bold text-muted px-4 py-3" style={{ width: '30%' }}>Package</td>
//                   <td className="px-4 py-3">
//                     {project?.projectType === "package" && packageAllData.length > 0
//                       ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                       : "Custom Package"}
//                   </td>
//                   <td className="fw-bold text-muted px-4 py-3" style={{ width: '30%' }}>Client Name</td>
//                   <td className="px-4 py-3 text-capitalize">{project?.clientName}</td>
//                 </tr>
//                 <tr className="bg-light">
//                   <td className="fw-bold text-muted px-4 py-3">Project ID</td>
//                   <td className="px-4 py-3"><code>{project?._id}</code></td>
//                   <td className="fw-bold text-muted px-4 py-3">Client ID</td>
//                   <td className="px-4 py-3"><code>{project?.clientId?._id}</code></td>
//                 </tr>
//                 <tr>
//                   <td className="fw-bold text-muted px-4 py-3">Total Price</td>
//                   <td className="px-4 py-3">
//                     <span className="fs-5 fw-bold text-success">${project?.totalPrice}</span>
//                   </td>
//                   <td className="fw-bold text-muted px-4 py-3">Initiated</td>
//                   <td className="px-4 py-3">
//                     {project?.startAt && formatDateFunc(project.startAt)}
//                   </td>
//                 </tr>
//                 {(teamAtDate || startAtDate || expireAtDate) && (
//                   <>
//                     {teamAtDate && (
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Team Allotted</td>
//                         <td className="px-4 py-3">{teamAtDate}</td>
//                         {startAtDate && (
//                           <>
//                             <td className="fw-bold text-muted px-4 py-3">Project Start</td>
//                             <td className="px-4 py-3">{startAtDate}</td>
//                           </>
//                         )}
//                       </tr>
//                     )}
//                     {expireAtDate && (
//                       <tr>
//                         <td className="fw-bold text-muted px-4 py-3">Expire Date</td>
//                         <td className="px-4 py-3">
//                           <span className="text-danger fw-semibold">{expireAtDate}</span>
//                         </td>
//                         <td colSpan="2"></td>
//                       </tr>
//                     )}
//                   </>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </Container>

//       {/* SERVICES TABLE */}
//       <Container className="mb-4">
//         <div className="card shadow-sm">
//           <div className="card-header bg-primary text-white">
//             <h5 className="mb-0"><i className="bi bi-list-check me-2"></i>Services</h5>
//           </div>
//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table table-hover table-bordered mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="px-4 py-3">Service Name</th>
//                     <th className="px-4 py-3">Duration</th>
//                     <th className="px-4 py-3">Description</th>
//                     <th className="px-4 py-3 text-end">Company Price</th>
//                     {project?.team?.team?.some((member) => member.staffId?.source === "Freelancer") && (
//                       <th className="px-4 py-3 text-end">Freelancer Price</th>
//                     )}
//                     <th className="px-4 py-3 text-center">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project?.service?.map((serviceValue, idx) => (
//                     <tr key={serviceValue.serviceId}>
//                       <td className="px-4 py-3 fw-semibold text-capitalize">{serviceValue.serviceName}</td>
//                       <td className="px-4 py-3 text-nowrap">
//                         {serviceValue?.serviceStart ? 
//                           `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}` 
//                           : '—'}
//                       </td>
//                       <td className="px-4 py-3">{serviceValue?.brief || '—'}</td>
//                       <td className="px-4 py-3 text-end fw-bold text-success">${serviceValue?.price}</td>
//                       {project?.team?.team?.some((member) => member.staffId?.source === "Freelancer") && (
//                         <td className="px-4 py-3 text-end text-muted">${serviceValue.freelancerPrice}</td>
//                       )}
//                       <td className="px-4 py-3 text-center">
//                         <span className={`badge ${
//                           project.projectStatus === "completed" ? "bg-success" :
//                           project.projectStatus === "running" ? "bg-primary" : "bg-warning"
//                         }`}>
//                           {project.projectStatus}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </Container>

//       <Container>
//             <div className="border-top pt-3 mt-3">
//                 <h6 className="fw-bold mb-3"><i className="bi bi-file-earmark-text me-2"></i>Invoices</h6>
                
//                 <div className="row g-3">
//                   {/* 📄 PURCHASE INVOICE */}
//                   {project.payment.invoiceNumber && (
//                     <div className="col-md-6">
//                       <div className="card border-success">
//                         <div className="card-body">
//                           <div className="d-flex justify-content-between align-items-start mb-2">
//                             <div>
//                               <h6 className="mb-1 text-success">
//                                 <i className="bi bi-receipt me-2"></i>Purchase Invoice
//                               </h6>
//                               <small className="text-muted">Invoice No: {project.payment.invoiceNumber}</small>
//                             </div>
//                             <span className="badge bg-success">PAID</span>
//                           </div>
//                           <div className="mb-2">
//                             <small className="text-muted d-block">Invoice Date</small>
//                             <span className="fw-semibold">{project.payment.invoiceDate}</span>
//                           </div>
//                           <div className="mb-3">
//                             <small className="text-muted d-block">Amount</small>
//                             <span className="fs-5 fw-bold text-success">
//                               {project.payment.currency === "INR" ? "₹" : "$"}
//                               {project.payment.finalAmount?.toFixed(2)}
//                             </span>
//                           </div>
//                           {project.payment.invoicePdfUrl && (
//                             <a 
//                               href={project.payment.invoicePdfUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="btn btn-success btn-sm w-100"
//                             >
//                               <i className="bi bi-download me-2"></i>Download Invoice
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* 💰 REFUND INVOICE */}
//                   {project.payment.refund?.isRefunded && project.payment.refund.refundInvoiceNumber && (
//                     <div className="col-md-6">
//                       <div className="card border-danger">
//                         <div className="card-body">
//                           <div className="d-flex justify-content-between align-items-start mb-2">
//                             <div>
//                               <h6 className="mb-1 text-danger">
//                                 <i className="bi bi-arrow-counterclockwise me-2"></i>Refund Invoice
//                               </h6>
//                               <small className="text-muted">Invoice No: {project.payment.refund.refundInvoiceNumber}</small>
//                             </div>
//                             <span className="badge bg-danger">REFUNDED</span>
//                           </div>
//                           <div className="mb-2">
//                             <small className="text-muted d-block">Refund Date</small>
//                             <span className="fw-semibold">{project.payment.refund.refundInvoiceDate}</span>
//                           </div>
//                           <div className="mb-3">
//                             <small className="text-muted d-block">Refund Amount</small>
//                             <span className="fs-5 fw-bold text-danger">
//                               {project.payment.currency === "INR" ? "₹" : "$"}
//                               {project.payment.refund.refundAmount?.toFixed(2)}
//                             </span>
//                           </div>
//                           {project.payment.refund.refundInvoicePdfUrl && (
//                             <a 
//                               href={project.payment.refund.refundInvoicePdfUrl}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="btn btn-danger btn-sm w-100"
//                             >
//                               <i className="bi bi-download me-2"></i>Download Refund Invoice
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Refund Button */}
           

//       </Container>

//       {/* TEAM TABLE */}
//       {project?.team && (
//         <Container className="mb-4">
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <h5 className="mb-0"><i className="bi bi-people-fill me-2"></i>Team Members</h5>
//             </div>
//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table className="table table-hover table-bordered mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th className="px-4 py-3">Role</th>
//                       <th className="px-4 py-3">Name</th>
//                       <th className="px-4 py-3">Source</th>
//                       <th className="px-4 py-3 text-center">Profile</th>
//                       <th className="px-4 py-3 text-center">Rate Assistant</th>
//                       <th className="px-4 py-3 text-center">Customer Rating</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="px-4 py-3 fw-semibold">{project.team.assistant?.role || "—"}</td>
//                       <td className="px-4 py-3">{project.team.assistant?.staffName || "—"}</td>
//                       <td className="px-4 py-3">
//                         <span className="badge bg-light text-dark border">
//                           {project.team.assistant?.source ? project.team.assistant.source : "Internal"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         <Link className="btn btn-sm btn-outline-primary">
//                           <i className="bi bi-eye me-1"></i>View
//                         </Link>
//                       </td>
//                       <td className="px-4 py-3 text-center">
//                         {assistantRating ? (
//                           <div>
//                             <Rating
//                               count={5}
//                               value={assistantRating.ratingStar}
//                               size={20}
//                               edit={false}
//                               activeColor="#ffa500"
//                             />
//                             <p className="small text-muted mb-0 mt-1">
//                               {assistantRating.ratingStar}.0 / 5
//                             </p>
//                           </div>
//                         ) : (
//                           <Button
//                             variant="contained"
//                             size="small"
//                             onClick={handleOpen}
//                             sx={{ 
//                               backgroundColor: '#ff9800',
//                               '&:hover': { backgroundColor: '#f57c00' },
//                               textTransform: 'none'
//                             }}
//                           >
//                             ⭐ Rate Now
//                           </Button>
//                         )}
//                       </td>
//                       <td className="px-4 py-3 text-center">—</td>
//                     </tr>

//                     {project.team.team?.map((member, i) => {
//                       const memberRatings = ratingAllData?.filter(
//                         (r) => r.projectId === project?._id && r.employ === member.staffId
//                       );

//                       return (
//                         <tr key={i}>
//                           <td className="px-4 py-3 fw-semibold">{member.role}</td>
//                           <td className="px-4 py-3">{member.staffName}</td>
//                           <td className="px-4 py-3">
//                             <span className="badge bg-light text-dark border">
//                               {member.staffId?.source || "Internal"}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3 text-center">
//                             <Link className="btn btn-sm btn-outline-primary">
//                               <i className="bi bi-eye me-1"></i>View
//                             </Link>
//                           </td>
//                           <td className="px-4 py-3 text-center">—</td>
//                           <td className="px-4 py-3 text-center">
//                             {memberRatings?.length > 0 ? (
//                               memberRatings.map((r, idx) => (
//                                 <div key={idx}>
//                                   <Rating
//                                     count={5}
//                                     value={r.ratingStar}
//                                     size={20}
//                                     edit={false}
//                                     activeColor="#ffa500"
//                                   />
//                                   <p className="small text-muted mb-0 mt-1">
//                                     {r.ratingStar}.0 / 5
//                                   </p>
//                                 </div>
//                               ))
//                             ) : (
//                               <span className="text-muted small">Not rated yet</span>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </Container>
//       )}

//       {/* PAYMENT DETAILS TABLE */}
//       {project?.payment && (
//         <Container className="mb-4">
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0"><i className="bi bi-credit-card me-2"></i>Payment Details</h5>
//               {project.payment.provider && (
//                 <span className="badge bg-white text-primary px-3 py-2">
//                   {project.payment.provider === "razorpay" ? "💳 RAZORPAY" : "🅿️ PAYPAL"}
//                 </span>
//               )}
//             </div>
//             <div className="card-body p-0">
//               <table className="table table-borderless mb-0">
//                 <tbody>
//                   {/* Payment Status */}
//                   <tr className={project.payment.status === "completed" ? "table-success" : 
//                                  project.payment.status === "refunded" ? "table-danger" : "table-warning"}>
//                     <td className="fw-bold px-4 py-3" style={{ width: '25%' }}>Payment Status</td>
//                     <td className="px-4 py-3" colSpan="3">
//                       <span className="badge bg-dark px-3 py-2 text-uppercase">
//                         {project.payment.status}
//                       </span>
//                     </td>
//                   </tr>

//                   {/* Invoice Details */}
//                   {project.payment.invoiceNumber && (
//                     <tr>
//                       <td className="fw-bold text-muted px-4 py-3">Invoice Number</td>
//                       <td className="px-4 py-3">{project.payment.invoiceNumber}</td>
//                       <td className="fw-bold text-muted px-4 py-3" style={{ width: '25%' }}>Invoice Date</td>
//                       <td className="px-4 py-3">{project.payment.invoiceDate}</td>
//                     </tr>
//                   )}

//                   {/* Transaction & Order IDs */}
//                   <tr className="bg-light">
//                     <td className="fw-bold text-muted px-4 py-3">Transaction ID</td>
//                     <td className="px-4 py-3"><code className="text-break">{project.payment.transactionId || "—"}</code></td>
//                     <td className="fw-bold text-muted px-4 py-3">
//                       {project.payment.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
//                     </td>
//                     <td className="px-4 py-3">
//                       <code className="text-break">{project.payment.razorpayOrderId || project.payment.paypalOrderId || "—"}</code>
//                     </td>
//                   </tr>

//                   {/* Provider & Currency */}
//                   <tr>
//                     <td className="fw-bold text-muted px-4 py-3">Payment Provider</td>
//                     <td className="px-4 py-3 text-capitalize">{project.payment.provider || "—"}</td>
//                     <td className="fw-bold text-muted px-4 py-3">Currency</td>
//                     <td className="px-4 py-3">
//                       <span className="badge bg-info">{project.payment.currency || "USD"}</span>
//                     </td>
//                   </tr>

//                   {/* Pricing */}
//                   <tr className="bg-light">
//                     <td className="fw-bold text-muted px-4 py-3">Subtotal</td>
//                     <td className="px-4 py-3 fw-bold">
//                       {project.payment.currency === "INR" ? "₹" : "$"}
//                       {project.payment.subtotal?.toFixed(2) || "0.00"}
//                     </td>
//                     {project.payment.discountAmount > 0 && (
//                       <>
//                         <td className="fw-bold text-muted px-4 py-3">Discount</td>
//                         <td className="px-4 py-3 fw-bold text-success">
//                           -{project.payment.currency === "INR" ? "₹" : "$"}
//                           {project.payment.discountAmount?.toFixed(2)}
//                         </td>
//                       </>
//                     )}
//                   </tr>

//                   {project.payment.couponCode && (
//                     <tr>
//                       <td className="fw-bold text-muted px-4 py-3">Coupon Code</td>
//                       <td className="px-4 py-3" colSpan="3">
//                         <span className="badge bg-success px-3 py-2">{project.payment.couponCode}</span>
//                       </td>
//                     </tr>
//                   )}

//                   {/* Tax Breakdown */}
//                   {project.payment.taxBreakdown && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Tax Breakdown</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Subtotal (Before Tax)</td>
//                         <td className="px-4 py-3">₹{project.payment.taxBreakdown.subtotal?.toFixed(2) || "0.00"}</td>
//                         {project.payment.taxBreakdown.isDelhi ? (
//                           <>
//                             <td className="fw-bold text-muted px-4 py-3">CGST @ 9%</td>
//                             <td className="px-4 py-3">₹{project.payment.taxBreakdown.cgst?.toFixed(2) || "0.00"}</td>
//                           </>
//                         ) : (
//                           <>
//                             <td className="fw-bold text-muted px-4 py-3">IGST @ 18%</td>
//                             <td className="px-4 py-3">₹{project.payment.taxBreakdown.igst?.toFixed(2) || "0.00"}</td>
//                           </>
//                         )}
//                       </tr>
//                       {project.payment.taxBreakdown.isDelhi && (
//                         <tr>
//                           <td className="fw-bold text-muted px-4 py-3">SGST @ 9%</td>
//                           <td className="px-4 py-3">₹{project.payment.taxBreakdown.sgst?.toFixed(2) || "0.00"}</td>
//                           <td className="fw-bold text-muted px-4 py-3">Total Tax</td>
//                           <td className="px-4 py-3 fw-bold text-primary">
//                             ₹{project.payment.taxBreakdown.totalTax?.toFixed(2) || "0.00"}
//                           </td>
//                         </tr>
//                       )}
//                       {!project.payment.taxBreakdown.isDelhi && (
//                         <tr className="bg-light">
//                           <td className="fw-bold text-muted px-4 py-3">Total Tax</td>
//                           <td className="px-4 py-3 fw-bold text-primary" colSpan="3">
//                             ₹{project.payment.taxBreakdown.totalTax?.toFixed(2) || "0.00"}
//                           </td>
//                         </tr>
//                       )}
//                     </>
//                   )}

//                   {/* Business Details */}
//                   {(project.payment.companyName || project.payment.gstNumber) && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Business Details</td>
//                       </tr>
//                       {project.payment.companyName && (
//                         <tr className="bg-light">
//                           <td className="fw-bold text-muted px-4 py-3">Company Name</td>
//                           <td className="px-4 py-3">{project.payment.companyName}</td>
//                           {project.payment.gstNumber && (
//                             <>
//                               <td className="fw-bold text-muted px-4 py-3">GST Number</td>
//                               <td className="px-4 py-3">{project.payment.gstNumber}</td>
//                             </>
//                           )}
//                         </tr>
//                       )}
//                       {project.payment.gstStateCode && (
//                         <tr>
//                           <td className="fw-bold text-muted px-4 py-3">GST State Code</td>
//                           <td className="px-4 py-3" colSpan="3">{project.payment.gstStateCode}</td>
//                         </tr>
//                       )}
//                     </>
//                   )}

//                   {/* Billing Address */}
//                   {project.payment.clientAddress && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Billing Address</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Address</td>
//                         <td className="px-4 py-3">{project.payment.clientAddress}</td>
//                         <td className="fw-bold text-muted px-4 py-3">City</td>
//                         <td className="px-4 py-3">{project.payment.clientCity}</td>
//                       </tr>
//                       <tr>
//                         <td className="fw-bold text-muted px-4 py-3">State</td>
//                         <td className="px-4 py-3">{project.payment.clientState}</td>
//                         <td className="fw-bold text-muted px-4 py-3">Pincode</td>
//                         <td className="px-4 py-3">{project.payment.clientPincode}</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Country</td>
//                         <td className="px-4 py-3" colSpan="3">{project.payment.clientCountry}</td>
//                       </tr>
//                     </>
//                   )}

//                   {/* Conversion Rate & USD Amount */}
//                   {(project.payment.conversionRate || project.payment.finalAmountUSD) && (
//                     <tr>
//                       {project.payment.conversionRate && (
//                         <>
//                           <td className="fw-bold text-muted px-4 py-3">Conversion Rate</td>
//                           <td className="px-4 py-3">$1 = ₹{project.payment.conversionRate?.toFixed(2)}</td>
//                         </>
//                       )}
//                       {project.payment.finalAmountUSD && (
//                         <>
//                           <td className="fw-bold text-muted px-4 py-3">Amount in USD</td>
//                           <td className="px-4 py-3 fw-bold text-success">${project.payment.finalAmountUSD?.toFixed(2)}</td>
//                         </>
//                       )}
//                     </tr>
//                   )}

//                   {/* Final Amount - HIGHLIGHTED */}
//                   <tr className="table-primary">
//                     <td className="fw-bold px-4 py-4 fs-5">Final Amount</td>
//                     <td className="px-4 py-4 fs-3 fw-bold text-primary" colSpan="3">
//                       {project.payment.currency === "INR" ? "₹" : "$"}
//                       {project.payment.finalAmount?.toFixed(2) || "0.00"}
//                     </td>
//                   </tr>

//                   {/* Paid At */}
//                   {project.payment.paidAt && (
//                     <tr className="bg-light">
//                       <td className="fw-bold text-muted px-4 py-3">Paid At</td>
//                       <td className="px-4 py-3" colSpan="3">
//                         {new Date(project.payment.paidAt).toLocaleDateString("en-US", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </td>
//                     </tr>
//                   )}

//                   {/* Payer Information */}
//                   {project.payment.payer && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Payer Information</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Name</td>
//                         <td className="px-4 py-3">{project.payment.payer.name}</td>
//                         <td className="fw-bold text-muted px-4 py-3">Email</td>
//                         <td className="px-4 py-3 text-break">{project.payment.payer.email}</td>
//                       </tr>
//                       <tr>
//                         <td className="fw-bold text-muted px-4 py-3">Payer ID</td>
//                         <td className="px-4 py-3">{project.payment.payer.payerId}</td>
//                         <td className="fw-bold text-muted px-4 py-3">Country</td>
//                         <td className="px-4 py-3 text-uppercase">{project.payment.payer.country}</td>
//                       </tr>
//                     </>
//                   )}

//                   {/* Dispute Status */}
//                   {project.payment.dispute && (
//                     <tr className={project.payment.dispute.isDisputed ? "table-danger" : "table-success"}>
//                       <td className="fw-bold px-4 py-3">Dispute Status</td>
//                       <td className="px-4 py-3 fw-semibold" colSpan="3">
//                         {project.payment.dispute.isDisputed ? "⚠️ Payment Disputed" : "✓ No Disputes"}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {/* Refund Button */}
//               {project.payment.status === "completed" && !project.payment.refund?.isRefunded && (
//                 <div className="p-4">
//                   <Button
//                     variant="contained"
//                     color="error"
//                     fullWidth
//                     onClick={handleRefundClick}
//                     startIcon={<i className="bi bi-arrow-counterclockwise"></i>}
//                     sx={{ 
//                       padding: "14px",
//                       fontWeight: "600",
//                       fontSize: "15px",
//                       textTransform: "none",
//                     }}
//                   >
//                     Process Refund via {project.payment.provider === "razorpay" ? "Razorpay" : "PayPal"}
//                   </Button>
//                 </div>
//               )}

//               {/* Refund Info */}
//               {project.payment.refund?.isRefunded && (
//                 <div className="p-4">
//                   <div className="alert alert-success mb-0">
//                     <h6 className="mb-3 fw-bold">
//                       <i className="bi bi-check-circle-fill me-2"></i>Refund Processed Successfully
//                     </h6>
//                     <table className="table table-sm table-borderless mb-0">
//                       <tbody>
//                         <tr>
//                           <td className="fw-bold" style={{ width: '30%' }}>Refund Amount</td>
//                           <td className="fs-5 fw-bold text-success">
//                             {project.payment.currency === "INR" ? "₹" : "$"}
//                             {project.payment.refund.refundAmount?.toFixed(2)}
//                           </td>
//                           <td className="fw-bold">Status</td>
//                           <td>
//                             <span className="badge bg-success text-uppercase">
//                               {project.payment.refund.refundStatus}
//                             </span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="fw-bold">Refund ID</td>
//                           <td colSpan="3"><code>{project.payment.refund.refundId}</code></td>
//                         </tr>
//                         <tr>
//                           <td className="fw-bold">Refunded At</td>
//                           <td colSpan="3">
//                             {new Date(project.payment.refund.refundedAt).toLocaleString("en-US", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </td>
//                         </tr>
//                         {project.payment.refund.refundReason && (
//                           <tr>
//                             <td className="fw-bold">Reason</td>
//                             <td colSpan="3">{project.payment.refund.refundReason}</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* Payment History */}
//               {project.payment.history && project.payment.history.length > 0 && (
//                 <div className="p-4 border-top">
//                   <h6 className="fw-bold mb-3">
//                     <i className="bi bi-clock-history me-2"></i>Payment History
//                   </h6>
//                   <div className="table-responsive">
//                     <table className="table table-sm table-bordered">
//                       <thead className="table-light">
//                         <tr>
//                           <th className="px-3 py-2">Action</th>
//                           <th className="px-3 py-2">Amount</th>
//                           <th className="px-3 py-2">Transaction ID</th>
//                           <th className="px-3 py-2">Reason</th>
//                           <th className="px-3 py-2">Timestamp</th>
//                           <th className="px-3 py-2">Performed By</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {project.payment.history.map((event, index) => (
//                           <tr key={index}>
//                             <td className="px-3 py-2">
//                               <span className={`badge ${
//                                 event.status === "completed" ? "bg-success" :
//                                 event.status === "pending" ? "bg-warning text-dark" :
//                                 event.status === "refunded" ? "bg-danger" : "bg-secondary"
//                               }`}>
//                                 {event.action.toUpperCase()}
//                               </span>
//                             </td>
//                             <td className="px-3 py-2 fw-semibold">
//                               {project.payment.currency === "INR" ? "₹" : "$"}
//                               {event.amount?.toFixed(2)}
//                             </td>
//                             <td className="px-3 py-2"><code className="small">{event.transactionId}</code></td>
//                             <td className="px-3 py-2">{event.reason || "—"}</td>
//                             <td className="px-3 py-2 text-nowrap small">
//                               {new Date(event.timestamp).toLocaleDateString("en-US", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </td>
//                             <td className="px-3 py-2">
//                               <span className="badge bg-secondary">{event.performedBy}</span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Container>
//       )}

//       {/* Rating Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             position: "relative",
//           }}
//         >
//           <button
//             onClick={() => setOpenModal(false)}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               background: "none",
//               border: "none",
//               fontSize: "22px",
//               cursor: "pointer",
//               color: "#555",
//               lineHeight: 1,
//             }}
//             title="Close"
//           >
//             &times;
//           </button>

//           <Typography variant="h6" mb={2} textAlign="center" fontWeight="bold" color="primary">
//             Rate Assistant
//           </Typography>

//           <Box textAlign="center" mb={3}>
//             <Rating
//               count={5}
//               value={ratingValue}
//               onChange={(newValue) => setRatingValue(newValue)}
//               size={40}
//               activeColor="#ffd700"
//             />
//           </Box>

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mb: 3 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ProjectViewPage;















// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Stack, Typography, Modal, Box, Button, TextField } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// const ProjectViewPage = () => {
//   const { projectId } = useParams();
//   const packageAllData = useSelector((store) => store.package.data);
//   const ratingAllData = useSelector((store) => store.rating.data);
//   const dispatch = useDispatch();
//   const [project, setProject] = useState();
//   const [createDate, setCreateDate] = useState();
//   const [teamAtDate, setTeamAtDate] = useState();
//   const [startAtDate, setStartAtDate] = useState();
//   const [expireAtDate, setExpireAtDate] = useState();

//   // ⭐ Rating Modal States
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const projectDetailsFunc = async () => {
//     try {
//       const response = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getProjectFunc = async () => {
//     const response = await SingleProject(projectId);
//     setProject(response.data);
//     const dateString = response.data.createdAt;

//     if (response.data.expireAt) {
//       const expireDateObj = new Date(response.data.expireAt);
//       setExpireAtDate(
//         `${expireDateObj.getDate()} ${expireDateObj.toLocaleString("default", { month: "long" })} ${expireDateObj.getFullYear()}`
//       );
//     }

//     if (response.data.teamAt && response.data.startAt) {
//       const teamDateObj = new Date(response.data.teamAt);
//       const startDateObj = new Date(response.data.startAt);
//       setTeamAtDate(
//         `${teamDateObj.getDate()} ${teamDateObj.toLocaleString("default", { month: "long" })} ${teamDateObj.getFullYear()}`
//       );
//       setStartAtDate(
//         `${startDateObj.getDate()} ${startDateObj.toLocaleString("default", { month: "long" })} ${startDateObj.getFullYear()}`
//       );
//     }

//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January","February","March","April","May","June","July","August","September","October","November","December"
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({ day, month, year, time: `${formattedHours}:${minutes} ${timeOfDay}`, timezone });
//   };

//   function formatDate(dateString) {
//     if (dateString) {
//       const [year, month, day] = dateString.split("-");
//       const date = new Date(year, month - 1, day);
//       const formattedDay = date.getDate().toString().padStart(2, "0");
//       const formattedMonth = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
//       const formattedYear = date.getFullYear().toString();
//       return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//   }

//   function formatDateFunc(inputDate) {
//     const date = new Date(inputDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   }

//   // ⭐ Submit Assistant Rating
//   const handleSubmitRating = async () => {
//     if (ratingValue === 0) {
//       Swal.fire("Warning", "Please select a rating.", "warning");
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       };

//       await axios.post(`${Url}/rating/add-assistant-rating`, payload);
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       setRatingValue(0);
//       setFeedback("");
//       dispatch(projectdata());
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 UNIFIED REFUND HANDLER
//   const handleRefundClick = async () => {
//     const paymentProvider = project.payment?.provider || "unknown";
//     const paymentId = project.payment?.razorpayPaymentId || project.payment?.paypalOrderId;
//     const maxRefundAmount = project.payment?.finalAmount || 0;
//     const currency = project.payment?.currency || "USD";
//     const currencySymbol = currency === "INR" ? "₹" : "$";

//     const refundEndpoint = paymentProvider === "razorpay" 
//       ? `${Url}/api/razorpay/refund-order`
//       : `${Url}/paypal/refund-order`;

//     const result = await Swal.fire({
//       title: "Process Refund?",
//       html: `
//         <div style="text-align: left; padding: 15px;">
//           <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0166FF;">
//             <p style="margin: 5px 0;"><strong>Payment Provider:</strong> 
//               <span style="text-transform: uppercase; color: ${paymentProvider === 'razorpay' ? '#0166FF' : '#003087'}; font-weight: 600;">
//                 ${paymentProvider === 'razorpay' ? '💳 RAZORPAY' : '🅿️ PAYPAL'}
//               </span>
//             </p>
//             <p style="margin: 5px 0;"><strong>Project ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${project._id}</code></p>
//             <p style="margin: 5px 0;"><strong>Payment ID:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 3px;">${paymentId}</code></p>
//             <p style="margin: 15px 0 5px 0; font-size: 18px;"><strong>Total Amount:</strong> <span style="color: #d9534f; font-size: 24px; font-weight: bold;">${currencySymbol}${maxRefundAmount.toFixed(2)}</span></p>
//           </div>
          
//           <div style="margin-bottom: 15px;">
//             <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//               Refund Amount (in ${currency}) 
//             </label>
//             <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">
//               Leave empty for full refund (${currencySymbol}${maxRefundAmount.toFixed(2)})
//             </p>
//             <input 
//               id="refund-amount" 
//               class="swal2-input" 
//               placeholder="Enter amount in ${currency}"
//               type="number"
//               step="0.01"
//               min="0.01"
//               max="${maxRefundAmount}"
//               style="width: 100%; margin: 0; padding: 10px; border: 2px solid #ddd; border-radius: 6px; font-size: 14px;"
//             />
//           </div>
          
//           <div>
//             <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #333;">
//               Reason for Refund
//             </label>
//             <textarea 
//               id="refund-reason" 
//               class="swal2-textarea" 
//               placeholder="Enter refund reason (optional)"
//               style="width: 100%; min-height: 80px; padding: 10px; border: 2px solid #ddd; border-radius: 6px; resize: vertical; font-size: 14px;"
//             ></textarea>
//           </div>
//         </div>
//       `,
//       icon: "warning",
//       iconColor: "#ff9800",
//       showCancelButton: true,
//       confirmButtonText: '✓ Process Refund',
//       confirmButtonColor: "#d33",
//       cancelButtonText: '✕ Cancel',
//       cancelButtonColor: "#6c757d",
//       width: "600px",
//       preConfirm: () => {
//         const amount = document.getElementById("refund-amount").value.trim();
//         const reason = document.getElementById("refund-reason").value.trim();

//         if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxRefundAmount)) {
//           Swal.showValidationMessage(
//             `Amount must be between ${currencySymbol}0.01 and ${currencySymbol}${maxRefundAmount.toFixed(2)}`
//           );
//           return false;
//         }

//         return { 
//           amount: amount ? parseFloat(amount) : null,
//           reason: reason || "Refund requested by admin" 
//         };
//       },
//     });

//     if (result.isConfirmed) {
//       try {
//         Swal.fire({
//           title: "Processing Refund...",
//           html: `
//             <div style="text-align: center; padding: 20px;">
//               <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem; margin-bottom: 15px;">
//                 <span class="visually-hidden">Loading...</span>
//               </div>
//               <p style="font-size: 14px; color: #666; margin: 0;">
//                 Please wait while we process the refund via <strong style="text-transform: uppercase;">${paymentProvider}</strong>
//               </p>
//             </div>
//           `,
//           allowOutsideClick: false,
//           allowEscapeKey: false,
//           showConfirmButton: false,
//         });

//         const response = await axios.post(
//           refundEndpoint,
//           {
//             projectId: project._id,
//             amount: result.value.amount,
//             reason: result.value.reason,
//           },
//           {
//             headers: { authorization: localStorage.getItem("token") },
//           }
//         );

//         const refundedAmount = response.data.amount || result.value.amount || maxRefundAmount;
//         const refundInvoiceNumber = response.data.refundInvoiceNumber;

//         Swal.fire({
//           icon: "success",
//           title: "Refund Successful!",
//           html: `
//             <div style="text-align: left; padding: 15px;">
//               <div style="padding: 15px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 15px;">
//                 <p style="margin: 5px 0;"><strong>Refund ID:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px;">${response.data.refundId}</code></p>
//                 ${refundInvoiceNumber ? `<p style="margin: 5px 0;"><strong>Refund Invoice:</strong> <code style="background: white; padding: 2px 6px; border-radius: 3px;">${refundInvoiceNumber}</code></p>` : ''}
//                 <p style="margin: 5px 0;"><strong>Amount Refunded:</strong> 
//                   <span style="color: #28a745; font-size: 20px; font-weight: bold;">
//                     ${currencySymbol}${refundedAmount.toFixed(2)}
//                   </span>
//                 </p>
//                 <p style="margin: 5px 0;"><strong>Provider:</strong> 
//                   <span style="text-transform: uppercase; font-weight: 600;">
//                     ${paymentProvider}
//                   </span>
//                 </p>
//                 <p style="margin: 5px 0;"><strong>Status:</strong> <span class="badge bg-success">Processed</span></p>
//               </div>
              
//               <p style="font-size: 13px; color: #666; margin: 0; text-align: center;">
//                 The refund will be credited within 5-7 business days
//               </p>
//             </div>
//           `,
//           confirmButtonText: "OK",
//           confirmButtonColor: "#28a745",
//           width: "550px",
//         });

//         await projectDetailsFunc();

//       } catch (error) {
//         console.error("Refund Error:", error);
        
//         const errorMessage = error.response?.data?.message || "Refund failed";
//         const errorDetails = error.response?.data?.details || 
//                             error.response?.data?.error || 
//                             error.message;

//         Swal.fire({
//           icon: "error",
//           title: "Refund Failed",
//           html: `
//             <div style="text-align: left; padding: 15px;">
//               <div style="background: #f8d7da; padding: 15px; border-radius: 8px; border-left: 4px solid #d9534f;">
//                 <p style="margin: 0 0 10px 0; font-weight: bold; color: #721c24;">
//                   ${errorMessage}
//                 </p>
//                 ${errorDetails ? `
//                   <div style="padding: 10px; background: white; border-radius: 4px; margin-top: 10px;">
//                     <p style="margin: 0; font-size: 13px; color: #666; font-family: monospace;">
//                       ${errorDetails}
//                     </p>
//                   </div>
//                 ` : ''}
//               </div>
//               <p style="margin: 10px 0 0 0; font-size: 12px; color: #666; text-align: center;">
//                 If the issue persists, please contact support.
//               </p>
//             </div>
//           `,
//           confirmButtonText: "OK",
//           confirmButtonColor: "#d33",
//           width: "550px",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     projectDetailsFunc();
//   }, []);

//   const assistantRating = ratingAllData?.find(
//     (r) =>
//       r.projectId === project?._id &&
//       r.employ === project?.team?.assistant?.staffId
//   );



//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project View</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom className="fw-bold">
//             Project Details
//           </Typography>
//           <span className={`badge ${
//             project?.projectStatus === 'refunded' ? 'bg-danger' :
//             project?.projectStatus === 'partially_refunded' ? 'bg-warning' :
//             project?.projectStatus === 'completed' ? 'bg-success' :
//             project?.projectStatus === 'running' ? 'bg-primary' : 'bg-warning'
//           } px-3 py-2 fs-6 text-uppercase`}>
//             {project?.projectStatus === 'partially_refunded' ? 'PARTIAL REFUND' : project?.projectStatus}
//           </span>
//         </Stack>
//       </Container>

//       {/* PROJECT DETAILS - COMPACT */}
//       <Container className="mb-4">
//         <div className="card shadow-sm">
//           <div className="card-header bg-primary text-white">
//             <h5 className="mb-0"><i className="bi bi-folder2-open me-2"></i>Project Overview</h5>
//           </div>
//           <div className="card-body">
//             <div className="row g-3">
//               <div className="col-md-3">
//                 <small className="text-muted d-block">Project ID</small>
//                 <code className="fw-bold">{project?._id}</code>
//               </div>
//               <div className="col-md-3">
//                 <small className="text-muted d-block">Client</small>
//                 <span className="fw-semibold text-capitalize">{project?.clientName}</span>
//               </div>
//               <div className="col-md-3">
//                 <small className="text-muted d-block">Package</small>
//                 <span className="fw-semibold">
//                   {project?.projectType === "package" && packageAllData.length > 0
//                     ? packageAllData.find((p) => p._id === project.packageId)?.packageName
//                     : "Custom Package"}
//                 </span>
//               </div>
//               <div className="col-md-3">
//                 <small className="text-muted d-block">Total Price</small>
//                 <span className="fs-5 fw-bold text-success">${project?.totalPrice}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* SERVICES - COMPACT */}
//       <Container className="mb-4">
//         <div className="card shadow-sm">
//           <div className="card-header bg-primary text-white">
//             <h5 className="mb-0"><i className="bi bi-list-check me-2"></i>Services</h5>
//           </div>
//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table table-sm table-hover mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th className="px-3 py-2">Service</th>
//                     <th className="px-3 py-2">Duration</th>
//                     <th className="px-3 py-2 text-end">Price</th>
//                     <th className="px-3 py-2 text-center">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project?.service?.map((serviceValue, idx) => (
//                     <tr key={idx}>
//                       <td className="px-3 py-2 fw-semibold text-capitalize">{serviceValue.serviceName}</td>
//                       <td className="px-3 py-2 text-nowrap small">
//                         {serviceValue?.serviceStart ? 
//                           `${formatDate(serviceValue.serviceStart)} - ${formatDate(serviceValue.serviceEnd)}` 
//                           : '—'}
//                       </td>
//                       <td className="px-3 py-2 text-end fw-bold text-success">${serviceValue?.price}</td>
//                       <td className="px-3 py-2 text-center">
//                         <span className={`badge ${
//                           project.projectStatus === "completed" ? "bg-success" :
//                           project.projectStatus === "running" ? "bg-primary" : "bg-warning"
//                         }`}>
//                           {project.projectStatus}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* PAYMENT DETAILS TABLE - ORIGINAL FULL VERSION */}
//       {project?.payment && (
//         <Container className="mb-4">
//           <div className="card shadow-sm">
//             <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0"><i className="bi bi-credit-card me-2"></i>Payment Details</h5>
//               {project.payment.provider && (
//                 <span className="badge bg-white text-primary px-3 py-2">
//                   {project.payment.provider === "razorpay" ? "💳 RAZORPAY" : "🅿️ PAYPAL"}
//                 </span>
//               )}
//             </div>
//             <div className="card-body p-0">
//               <table className="table table-borderless mb-0">
//                 <tbody>
//                   {/* Payment Status */}
//                   <tr className={project.payment.status === "completed" ? "table-success" : 
//                                  project.payment.status === "refunded" ? "table-danger" : 
//                                  project.payment.status === "partially_refunded" ? "table-warning" : "table-warning"}>
//                     <td className="fw-bold px-4 py-3" style={{ width: '25%' }}>Payment Status</td>
//                     <td className="px-4 py-3" colSpan="3">
//                       <span className="badge bg-dark px-3 py-2 text-uppercase">
//                         {project.payment.status}
//                       </span>
//                     </td>
//                   </tr>

//                   {/* Invoice Details */}
//                   {project.payment.invoiceNumber && (
//                     <tr>
//                       <td className="fw-bold text-muted px-4 py-3">Invoice Number</td>
//                       <td className="px-4 py-3">{project.payment.invoiceNumber}</td>
//                       <td className="fw-bold text-muted px-4 py-3" style={{ width: '25%' }}>Invoice Date</td>
//                       <td className="px-4 py-3">{project.payment.invoiceDate}</td>
//                     </tr>
//                   )}

//                   {/* Transaction & Order IDs */}
//                   <tr className="bg-light">
//                     <td className="fw-bold text-muted px-4 py-3">Transaction ID</td>
//                     <td className="px-4 py-3"><code className="text-break">{project.payment.transactionId || "—"}</code></td>
//                     <td className="fw-bold text-muted px-4 py-3">
//                       {project.payment.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
//                     </td>
//                     <td className="px-4 py-3">
//                       <code className="text-break">{project.payment.razorpayOrderId || project.payment.paypalOrderId || "—"}</code>
//                     </td>
//                   </tr>

//                   {/* Provider & Currency */}
//                   <tr>
//                     <td className="fw-bold text-muted px-4 py-3">Payment Provider</td>
//                     <td className="px-4 py-3 text-capitalize">{project.payment.provider || "—"}</td>
//                     <td className="fw-bold text-muted px-4 py-3">Currency</td>
//                     <td className="px-4 py-3">
//                       <span className="badge bg-info">{project.payment.currency || "USD"}</span>
//                     </td>
//                   </tr>

//                   {/* Pricing */}
//                   <tr className="bg-light">
//                     <td className="fw-bold text-muted px-4 py-3">Subtotal</td>
//                     <td className="px-4 py-3 fw-bold">
//                       {project.payment.currency === "INR" ? "₹" : "$"}
//                       {project.payment.subtotal?.toFixed(2) || "0.00"}
//                     </td>
//                     {project.payment.discountAmount > 0 && (
//                       <>
//                         <td className="fw-bold text-muted px-4 py-3">Discount</td>
//                         <td className="px-4 py-3 fw-bold text-success">
//                           -{project.payment.currency === "INR" ? "₹" : "$"}
//                           {project.payment.discountAmount?.toFixed(2)}
//                         </td>
//                       </>
//                     )}
//                   </tr>

//                   {project.payment.couponCode && (
//                     <tr>
//                       <td className="fw-bold text-muted px-4 py-3">Coupon Code</td>
//                       <td className="px-4 py-3" colSpan="3">
//                         <span className="badge bg-success px-3 py-2">{project.payment.couponCode}</span>
//                       </td>
//                     </tr>
//                   )}

//                   {/* Tax Breakdown */}
//                   {project.payment.taxBreakdown && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Tax Breakdown</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Subtotal (Before Tax)</td>
//                         <td className="px-4 py-3">₹{project.payment.taxBreakdown.subtotal?.toFixed(2) || "0.00"}</td>
//                         {project.payment.taxBreakdown.isDelhi ? (
//                           <>
//                             <td className="fw-bold text-muted px-4 py-3">CGST @ 9%</td>
//                             <td className="px-4 py-3">₹{project.payment.taxBreakdown.cgst?.toFixed(2) || "0.00"}</td>
//                           </>
//                         ) : (
//                           <>
//                             <td className="fw-bold text-muted px-4 py-3">IGST @ 18%</td>
//                             <td className="px-4 py-3">₹{project.payment.taxBreakdown.igst?.toFixed(2) || "0.00"}</td>
//                           </>
//                         )}
//                       </tr>
//                       {project.payment.taxBreakdown.isDelhi && (
//                         <tr>
//                           <td className="fw-bold text-muted px-4 py-3">SGST @ 9%</td>
//                           <td className="px-4 py-3">₹{project.payment.taxBreakdown.sgst?.toFixed(2) || "0.00"}</td>
//                           <td className="fw-bold text-muted px-4 py-3">Total Tax</td>
//                           <td className="px-4 py-3 fw-bold text-primary">
//                             ₹{project.payment.taxBreakdown.totalTax?.toFixed(2) || "0.00"}
//                           </td>
//                         </tr>
//                       )}
//                       {!project.payment.taxBreakdown.isDelhi && (
//                         <tr className="bg-light">
//                           <td className="fw-bold text-muted px-4 py-3">Total Tax</td>
//                           <td className="px-4 py-3 fw-bold text-primary" colSpan="3">
//                             ₹{project.payment.taxBreakdown.totalTax?.toFixed(2) || "0.00"}
//                           </td>
//                         </tr>
//                       )}
//                     </>
//                   )}

//                   {/* Business Details */}
//                   {(project.payment.companyName || project.payment.gstNumber) && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Business Details</td>
//                       </tr>
//                       {project.payment.companyName && (
//                         <tr className="bg-light">
//                           <td className="fw-bold text-muted px-4 py-3">Company Name</td>
//                           <td className="px-4 py-3">{project.payment.companyName}</td>
//                           {project.payment.gstNumber && (
//                             <>
//                               <td className="fw-bold text-muted px-4 py-3">GST Number</td>
//                               <td className="px-4 py-3">{project.payment.gstNumber}</td>
//                             </>
//                           )}
//                         </tr>
//                       )}
//                       {project.payment.gstStateCode && (
//                         <tr>
//                           <td className="fw-bold text-muted px-4 py-3">GST State Code</td>
//                           <td className="px-4 py-3" colSpan="3">{project.payment.gstStateCode}</td>
//                         </tr>
//                       )}
//                     </>
//                   )}

//                   {/* Billing Address */}
//                   {project.payment.clientAddress && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Billing Address</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Address</td>
//                         <td className="px-4 py-3">{project.payment.clientAddress}</td>
//                         <td className="fw-bold text-muted px-4 py-3">City</td>
//                         <td className="px-4 py-3">{project.payment.clientCity}</td>
//                       </tr>
//                       <tr>
//                         <td className="fw-bold text-muted px-4 py-3">State</td>
//                         <td className="px-4 py-3">{project.payment.clientState}</td>
//                         <td className="fw-bold text-muted px-4 py-3">Pincode</td>
//                         <td className="px-4 py-3">{project.payment.clientPincode}</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Country</td>
//                         <td className="px-4 py-3" colSpan="3">{project.payment.clientCountry}</td>
//                       </tr>
//                     </>
//                   )}

//                   {/* Conversion Rate & USD Amount */}
//                   {(project.payment.conversionRate || project.payment.finalAmountUSD) && (
//                     <tr>
//                       {project.payment.conversionRate && (
//                         <>
//                           <td className="fw-bold text-muted px-4 py-3">Conversion Rate</td>
//                           <td className="px-4 py-3">$1 = ₹{project.payment.conversionRate?.toFixed(2)}</td>
//                         </>
//                       )}
//                       {project.payment.finalAmountUSD && (
//                         <>
//                           <td className="fw-bold text-muted px-4 py-3">Amount in USD</td>
//                           <td className="px-4 py-3 fw-bold text-success">${project.payment.finalAmountUSD?.toFixed(2)}</td>
//                         </>
//                       )}
//                     </tr>
//                   )}

//                   {/* Final Amount - HIGHLIGHTED */}
//                   <tr className="table-primary">
//                     <td className="fw-bold px-4 py-4 fs-5">Final Amount</td>
//                     <td className="px-4 py-4 fs-3 fw-bold text-primary" colSpan="3">
//                       {project.payment.currency === "INR" ? "₹" : "$"}
//                       {project.payment.finalAmount?.toFixed(2) || "0.00"}
//                     </td>
//                   </tr>

//                   {/* Paid At */}
//                   {project.payment.paidAt && (
//                     <tr className="bg-light">
//                       <td className="fw-bold text-muted px-4 py-3">Paid At</td>
//                       <td className="px-4 py-3" colSpan="3">
//                         {new Date(project.payment.paidAt).toLocaleDateString("en-US", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </td>
//                     </tr>
//                   )}

//                   {/* Payer Information */}
//                   {project.payment.payer && (
//                     <>
//                       <tr className="table-secondary">
//                         <td className="fw-bold px-4 py-3" colSpan="4">Payer Information</td>
//                       </tr>
//                       <tr className="bg-light">
//                         <td className="fw-bold text-muted px-4 py-3">Name</td>
//                         <td className="px-4 py-3">{project.payment.payer.name}</td>
//                         <td className="fw-bold text-muted px-4 py-3">Email</td>
//                         <td className="px-4 py-3 text-break">{project.payment.payer.email}</td>
//                       </tr>
//                       <tr>
//                         <td className="fw-bold text-muted px-4 py-3">Payer ID</td>
//                         <td className="px-4 py-3">{project.payment.payer.payerId}</td>
//                         <td className="fw-bold text-muted px-4 py-3">Country</td>
//                         <td className="px-4 py-3 text-uppercase">{project.payment.payer.country}</td>
//                       </tr>
//                     </>
//                   )}

//                   {/* Dispute Status */}
//                   {project.payment.dispute && (
//                     <tr className={project.payment.dispute.isDisputed ? "table-danger" : "table-success"}>
//                       <td className="fw-bold px-4 py-3">Dispute Status</td>
//                       <td className="px-4 py-3 fw-semibold" colSpan="3">
//                         {project.payment.dispute.isDisputed ? "⚠️ Payment Disputed" : "✓ No Disputes"}
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {/* 🔥 INVOICES DOWNLOAD SECTION */}
//               {(project.payment.invoicePdfUrl || project.payment.refund?.refundInvoicePdfUrl) && (
//                 <div className="p-4 border-top bg-light">
//                   <h6 className="fw-bold mb-3"><i className="bi bi-file-earmark-text me-2"></i>Download Invoices</h6>
//                   <div className="row g-3">
//                     {/* Purchase Invoice Button */}
//                     {project.payment.invoicePdfUrl && (
//                       <div className="col-md-6">
//                         <a
//                           href={project.payment.invoicePdfUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="btn btn-success w-100 d-flex align-items-center justify-content-center py-3"
//                         >
//                           <i className="bi bi-download me-2"></i>
//                           Download Purchase Invoice ({project.payment.invoiceNumber})
//                         </a>
//                       </div>
//                     )}

//                     {/* Refund Invoice Button */}
//                     {project.payment.refund?.refundInvoicePdfUrl && (
//                       <div className="col-md-6">
//                         <a
//                           href={project.payment.refund.refundInvoicePdfUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="btn btn-danger w-100 d-flex align-items-center justify-content-center py-3"
//                         >
//                           <i className="bi bi-arrow-counterclockwise me-2"></i>
//                           Download Refund Invoice ({project.payment.refund.refundInvoiceNumber})
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Refund Button */}
//               {project.payment.status === "completed" && !project.payment.refund?.isRefunded && (
//                 <div className="p-4">
//                   <Button
//                     variant="contained"
//                     color="error"
//                     fullWidth
//                     onClick={handleRefundClick}
//                     startIcon={<i className="bi bi-arrow-counterclockwise"></i>}
//                     sx={{ 
//                       padding: "14px",
//                       fontWeight: "600",
//                       fontSize: "15px",
//                       textTransform: "none",
//                     }}
//                   >
//                     Process Refund via {project.payment.provider === "razorpay" ? "Razorpay" : "PayPal"}
//                   </Button>
//                 </div>
//               )}

//               {/* Refund Info */}
//               {project.payment.refund?.isRefunded && (
//                 <div className="p-4">
//                   <div className="alert alert-success mb-0">
//                     <h6 className="mb-3 fw-bold">
//                       <i className="bi bi-check-circle-fill me-2"></i>Refund Processed Successfully
//                     </h6>
//                     <table className="table table-sm table-borderless mb-0">
//                       <tbody>
//                         <tr>
//                           <td className="fw-bold" style={{ width: '30%' }}>Refund Amount</td>
//                           <td className="fs-5 fw-bold text-success">
//                             {project.payment.currency === "INR" ? "₹" : "$"}
//                             {project.payment.refund.refundAmount?.toFixed(2)}
//                           </td>
//                           <td className="fw-bold">Status</td>
//                           <td>
//                             <span className="badge bg-success text-uppercase">
//                               {project.payment.refund.refundStatus}
//                             </span>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="fw-bold">Refund ID</td>
//                           <td colSpan="3"><code>{project.payment.refund.refundId}</code></td>
//                         </tr>
//                         {project.payment.refund.refundInvoiceNumber && (
//                           <tr>
//                             <td className="fw-bold">Refund Invoice</td>
//                             <td colSpan="3"><code>{project.payment.refund.refundInvoiceNumber}</code></td>
//                           </tr>
//                         )}
//                         <tr>
//                           <td className="fw-bold">Refunded At</td>
//                           <td colSpan="3">
//                             {new Date(project.payment.refund.refundedAt).toLocaleString("en-US", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             })}
//                           </td>
//                         </tr>
//                         {project.payment.refund.refundReason && (
//                           <tr>
//                             <td className="fw-bold">Reason</td>
//                             <td colSpan="3">{project.payment.refund.refundReason}</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* Payment History */}
//               {project.payment.history && project.payment.history.length > 0 && (
//                 <div className="p-4 border-top">
//                   <h6 className="fw-bold mb-3">
//                     <i className="bi bi-clock-history me-2"></i>Payment History
//                   </h6>
//                   <div className="table-responsive">
//                     <table className="table table-sm table-bordered">
//                       <thead className="table-light">
//                         <tr>
//                           <th className="px-3 py-2">Action</th>
//                           <th className="px-3 py-2">Amount</th>
//                           <th className="px-3 py-2">Transaction ID</th>
//                           <th className="px-3 py-2">Reason</th>
//                           <th className="px-3 py-2">Timestamp</th>
//                           <th className="px-3 py-2">Performed By</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {project.payment.history.map((event, index) => (
//                           <tr key={index}>
//                             <td className="px-3 py-2">
//                               <span className={`badge ${
//                                 event.status === "completed" ? "bg-success" :
//                                 event.status === "pending" ? "bg-warning text-dark" :
//                                 event.status === "refunded" ? "bg-danger" : "bg-secondary"
//                               }`}>
//                                 {event.action.toUpperCase()}
//                               </span>
//                             </td>
//                             <td className="px-3 py-2 fw-semibold">
//                               {project.payment.currency === "INR" ? "₹" : "$"}
//                               {event.amount?.toFixed(2)}
//                             </td>
//                             <td className="px-3 py-2"><code className="small">{event.transactionId}</code></td>
//                             <td className="px-3 py-2">{event.reason || "—"}</td>
//                             <td className="px-3 py-2 text-nowrap small">
//                               {new Date(event.timestamp).toLocaleDateString("en-US", {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </td>
//                             <td className="px-3 py-2">
//                               <span className="badge bg-secondary">{event.performedBy}</span>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Container>
//       )}

//       {/* TEAM TABLE - Same as before */}
//       {project?.team && (
//         <Container className="mb-4">
//           <div className="card shadow-sm">
//             <div className="card-header  text-white">
//               <h5 className="mb-0 text-dark"><i className="bi bi-people-fill me-2"></i>Team Members</h5>
//               <Link href={`edit-team/${project?.team?._id}`} className="btn bg-primary text-white">Edit Team</Link>
//             </div>
//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table className="table table-sm table-hover mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th className="px-3 py-2">Role</th>
//                       <th className="px-3 py-2">Name</th>
//                       <th className="px-3 py-2">Source</th>
//                       <th className="px-3 py-2 text-center">Rate</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td className="px-3 py-2 fw-semibold">{project.team.assistant?.role || "—"}</td>
//                       <td className="px-3 py-2">{project.team.assistant?.staffName || "—"}</td>
//                       <td className="px-3 py-2">
//                         <span className="badge bg-light text-dark border">
//                           {project.team.assistant?.source || "Internal"}
//                         </span>
//                       </td>
//                       <td className="px-3 py-2 text-center">
//                         {assistantRating ? (
//                           <div>
//                             <Rating
//                               count={5}
//                               value={assistantRating.ratingStar}
//                               size={18}
//                               edit={false}
//                               activeColor="#ffa500"
//                             />
//                           </div>
//                         ) : (
//                           <Button
//                             variant="contained"
//                             size="small"
//                             onClick={handleOpen}
//                             sx={{ 
//                               backgroundColor: '#ff9800',
//                               '&:hover': { backgroundColor: '#f57c00' },
//                               textTransform: 'none',
//                               fontSize: '12px'
//                             }}
//                           >
//                             ⭐ Rate
//                           </Button>
//                         )}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </Container>
//       )}

//       {/* Rating Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             mx: "auto",
//             mt: 10,
//             position: "relative",
//           }}
//         >
//           <button
//             onClick={() => setOpenModal(false)}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               background: "none",
//               border: "none",
//               fontSize: "22px",
//               cursor: "pointer",
//               color: "#555",
//               lineHeight: 1,
//             }}
//           >
//             &times;
//           </button>

//           <Typography variant="h6" mb={2} textAlign="center" fontWeight="bold" color="primary">
//             Rate Assistant
//           </Typography>

//           <Box textAlign="center" mb={3}>
//             <Rating
//               count={5}
//               value={ratingValue}
//               onChange={(newValue) => setRatingValue(newValue)}
//               size={40}
//               activeColor="#ffd700"
//             />
//           </Box>

//           <TextField
//             fullWidth
//             multiline
//             minRows={3}
//             label="Write your feedback..."
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mb: 3 }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             onClick={handleSubmitRating}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Feedback"}
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default ProjectViewPage;











// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Typography, Modal, Box, Button, TextField, Chip, CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// const formatDateStr = (dateString) => {
//   if (!dateString) return "—";
//   const [year, month, day] = dateString.split("-");
//   return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" })
//     .format(new Date(year, month - 1, day));
// };

// const formatDateObj = (dateInput) => {
//   if (!dateInput) return "—";
//   return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" })
//     .format(new Date(dateInput));
// };

// const formatDateTime = (dateInput) => {
//   if (!dateInput) return "—";
//   return new Intl.DateTimeFormat("en-US", {
//     day: "2-digit", month: "short", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   }).format(new Date(dateInput));
// };

// const currencySymbol = (currency) => currency === "INR" ? "₹" : "$";
// const fmtAmount = (currency, amount) => `${currencySymbol(currency)}${(amount ?? 0).toFixed(2)}`;

// const STATUS_CONFIG = {
//   completed:          { color: "success", label: "Completed" },
//   running:            { color: "primary", label: "Running" },
//   refunded:           { color: "error",   label: "Refunded" },
//   partially_refunded: { color: "warning", label: "Partial Refund" },
//   new:                { color: "warning", label: "New" },
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// /** Reusable section card */
// const Card = ({ icon, title, action, children }) => (
//   <div style={styles.card}>
//     <div style={styles.cardHeader}>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <span style={styles.cardIcon}>{icon}</span>
//         <h5 style={styles.cardTitle}>{title}</h5>
//       </div>
//       {action}
//     </div>
//     <div>{children}</div>
//   </div>
// );

// /** Key–value info row */
// const InfoRow = ({ label, value, accent }) => (
//   <div style={styles.infoRow}>
//     <span style={styles.infoLabel}>{label}</span>
//     <span style={{ ...styles.infoValue, ...(accent ? { color: "#2e7d32", fontWeight: 700, fontSize: 18 } : {}) }}>
//       {value}
//     </span>
//   </div>
// );

// /** Divider with label */
// const SectionDivider = ({ label }) => (
//   <div style={styles.sectionDivider}>
//     <span style={styles.sectionDividerLabel}>{label}</span>
//   </div>
// );

// // ─── Rating Modal ─────────────────────────────────────────────────────────────
// const RatingModal = ({ open, onClose, onSubmit, loading }) => {
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback]       = useState("");

//   const handleSubmit = () => {
//     onSubmit(ratingValue, feedback);
//     setRatingValue(0);
//     setFeedback("");
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={styles.modal}>
//         <button onClick={onClose} style={styles.modalClose}>&times;</button>
//         <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: 700, color: "#1a1a2e" }}>
//           ⭐ Rate Assistant
//         </Typography>
//         <Box textAlign="center" mb={3}>
//           <Rating count={5} value={ratingValue} onChange={setRatingValue} size={40} activeColor="#ffd700" />
//         </Box>
//         <TextField
//           fullWidth multiline minRows={3}
//           label="Write your feedback..."
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           sx={{ mb: 3 }}
//         />
//         <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//           {loading ? <CircularProgress size={20} color="inherit" /> : "Submit Feedback"}
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// // ─── Custom Hook ─────────────────────────────────────────────────────────────
// const useProject = (projectId) => {
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProject = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => { fetchProject(); }, [fetchProject]);

//   return { project, loading, refetch: fetchProject };
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ProjectViewPage = () => {
//   const { projectId }    = useParams();
//   const packageAllData   = useSelector((s) => s.package.data);
//   const ratingAllData    = useSelector((s) => s.rating.data);
//   const dispatch         = useDispatch();
//   const [openModal, setOpenModal] = useState(false);
//   const [ratingLoading, setRatingLoading] = useState(false);

//   const { project, loading, refetch } = useProject(projectId);

//   const assistantRating = useMemo(() =>
//     ratingAllData?.find(
//       (r) => r.projectId === project?._id && r.employ === project?.team?.assistant?.staffId
//     ), [ratingAllData, project]);

//   const packageName = useMemo(() => {
//     if (project?.projectType !== "package") return "Custom Package";
//     return packageAllData?.find((p) => p._id === project.packageId)?.packageName ?? "—";
//   }, [project, packageAllData]);

//   const statusCfg = STATUS_CONFIG[project?.projectStatus] ?? { color: "default", label: project?.projectStatus };

//   // ─── Rating submit ──────────────────────────────────────────────────────────
//   const handleSubmitRating = async (ratingValue, feedback) => {
//     if (!ratingValue) return Swal.fire("Warning", "Please select a rating.", "warning");
//     setRatingLoading(true);
//     try {
//       await axios.post(`${Url}/rating/add-assistant-rating`, {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       });
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       dispatch(projectdata());
//     } catch {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setRatingLoading(false);
//     }
//   };

//   // ─── Refund handler ─────────────────────────────────────────────────────────
//   const handleRefundClick = async () => {
//     const { payment } = project;
//     const provider    = payment?.provider ?? "unknown";
//     const paymentId   = payment?.razorpayPaymentId ?? payment?.paypalOrderId;
//     const maxAmount   = payment?.finalAmount ?? 0;
//     const currency    = payment?.currency ?? "USD";
//     const symbol      = currencySymbol(currency);
//     const endpoint    = provider === "razorpay"
//       ? `${Url}/api/razorpay/refund-order`
//       : `${Url}/paypal/refund-order`;

//     const result = await Swal.fire({
//       title: "Process Refund?",
//       html: `
//         <div style="text-align:left;padding:10px">
//           <div style="background:#f0f4ff;padding:14px;border-radius:8px;margin-bottom:16px;border-left:4px solid #3b82f6">
//             <p style="margin:4px 0"><strong>Provider:</strong> <span style="text-transform:uppercase;font-weight:700;color:#3b82f6">${provider}</span></p>
//             <p style="margin:4px 0"><strong>Payment ID:</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:3px">${paymentId}</code></p>
//             <p style="margin:12px 0 4px;font-size:17px"><strong>Total:</strong> <span style="color:#d9534f;font-size:22px;font-weight:700">${symbol}${maxAmount.toFixed(2)}</span></p>
//           </div>
//           <label style="font-weight:600;display:block;margin-bottom:6px">Refund Amount (leave empty for full)</label>
//           <input id="refund-amount" class="swal2-input" placeholder="Enter amount" type="number" step="0.01" min="0.01" max="${maxAmount}" style="width:100%;margin:0 0 12px" />
//           <label style="font-weight:600;display:block;margin-bottom:6px">Reason (optional)</label>
//           <textarea id="refund-reason" class="swal2-textarea" placeholder="Refund reason..." style="width:100%;min-height:70px"></textarea>
//         </div>`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Process Refund",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#6c757d",
//       width: "560px",
//       preConfirm: () => {
//         const amount = document.getElementById("refund-amount").value.trim();
//         const reason = document.getElementById("refund-reason").value.trim();
//         if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount)) {
//           Swal.showValidationMessage(`Amount must be between ${symbol}0.01 and ${symbol}${maxAmount.toFixed(2)}`);
//           return false;
//         }
//         return { amount: amount ? parseFloat(amount) : null, reason: reason || "Refund requested by admin" };
//       },
//     });

//     if (!result.isConfirmed) return;

//     try {
//       Swal.fire({ title: "Processing...", allowOutsideClick: false, showConfirmButton: false,
//         html: `<div style="text-align:center;padding:20px"><div class="spinner-border text-primary" style="width:3rem;height:3rem"></div><p style="margin-top:12px;color:#666">Please wait...</p></div>` });

//       const { data } = await axios.post(endpoint,
//         { projectId: project._id, amount: result.value.amount, reason: result.value.reason },
//         { headers: { authorization: localStorage.getItem("token") } }
//       );

//       const refunded = data.amount ?? result.value.amount ?? maxAmount;
//       Swal.fire({
//         icon: "success", title: "Refund Successful!",
//         html: `<div style="background:#d4edda;padding:14px;border-radius:8px;border-left:4px solid #28a745;text-align:left">
//           <p style="margin:4px 0"><strong>Refund ID:</strong> <code>${data.refundId}</code></p>
//           ${data.refundInvoiceNumber ? `<p style="margin:4px 0"><strong>Invoice:</strong> <code>${data.refundInvoiceNumber}</code></p>` : ""}
//           <p style="margin:4px 0"><strong>Amount:</strong> <span style="color:#28a745;font-size:20px;font-weight:700">${symbol}${refunded.toFixed(2)}</span></p>
//           <p style="margin:10px 0 0;font-size:12px;color:#555;text-align:center">Credited within 5–7 business days</p></div>`,
//         confirmButtonColor: "#28a745",
//       });
//       await refetch();
//     } catch (error) {
//       const msg     = error.response?.data?.message ?? "Refund failed";
//       const details = error.response?.data?.details ?? error.response?.data?.error ?? error.message;
//       Swal.fire({
//         icon: "error", title: "Refund Failed",
//         html: `<div style="background:#f8d7da;padding:14px;border-radius:8px;border-left:4px solid #d9534f;text-align:left">
//           <p style="font-weight:700;color:#721c24;margin:0 0 8px">${msg}</p>
//           ${details ? `<code style="font-size:12px;color:#555">${details}</code>` : ""}</div>`,
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//       <CircularProgress size={48} />
//     </Box>
//   );

//   const pay = project?.payment;

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Project View — {projectId}</title></Helmet>
//       <div style={styles.pageWrapper}>

//         {/* ── Page Header ── */}
//         <div style={styles.pageHeader}>
//           <div>
//             <p style={styles.breadcrumb}>
//               <Link to="/dashboard/app" style={styles.breadcrumbLink}>Dashboard</Link>
//               {" / "}
//               <Link to="/dashboard/complete-project" style={styles.breadcrumbLink}>Projects</Link>
//               {" / View"}
//             </p>
//             <h1 style={styles.pageTitle}>Project Details</h1>
//           </div>
//           <Chip
//             label={statusCfg.label}
//             color={statusCfg.color}
//             sx={{ fontWeight: 700, fontSize: 13, px: 1.5, py: 2.5, textTransform: "uppercase", letterSpacing: 1 }}
//           />
//         </div>

//         {/* ── Overview ── */}
//         <Card icon="📁" title="Project Overview">
//           <div style={styles.overviewGrid}>
//             {[
//               { label: "Project ID",  value: <code style={styles.code}>{project?._id}</code> },
//               { label: "Client",      value: <span style={{ textTransform: "capitalize" }}>{project?.clientName}</span> },
//               { label: "Package",     value: packageName },
//               { label: "Total Price", value: `$${project?.totalPrice}`, accent: true },
//             ].map(({ label, value, accent }) => (
//               <div key={label} style={styles.overviewCell}>
//                 <span style={styles.overviewLabel}>{label}</span>
//                 <span style={{ ...styles.overviewValue, ...(accent ? { color: "#2e7d32", fontSize: 22, fontWeight: 700 } : {}) }}>
//                   {value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* ── Services ── */}
//         {project?.service?.length > 0 && (
//           <Card icon="⚙️" title="Services">
//             <div style={{ overflowX: "auto" }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr style={styles.theadRow}>
//                     {["Service", "Duration", "Price", "Status"].map((h) => (
//                       <th key={h} style={styles.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project.service.map((svc, idx) => (
//                     <tr key={idx} style={styles.tbodyRow}>
//                       <td style={{ ...styles.td, fontWeight: 600, textTransform: "capitalize" }}>{svc.serviceName}</td>
//                       <td style={{ ...styles.td, fontSize: 13, color: "#666" }}>
//                         {svc.serviceStart ? `${formatDateStr(svc.serviceStart)} – ${formatDateStr(svc.serviceEnd)}` : "—"}
//                       </td>
//                       <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>${svc.price}</td>
//                       <td style={styles.td}>
//                         <Chip label={project.projectStatus} color={statusCfg.color} size="small"
//                           sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" }} />
//                       </td>
//                       <td><button className="btn bg-primary text-white">show all services</button></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         )}

//         {/* ── Payment Details ── */}
//         {pay && (
//           <Card
//             icon="💳"
//             title="Payment Details"
//             action={pay.provider && (
//               <Chip
//                 label={pay.provider === "razorpay" ? "💳 Razorpay" : "🅿️ PayPal"}
//                 variant="outlined"
//                 size="small"
//                 sx={{ fontWeight: 700, fontSize: 12 }}
//               />
//             )}
//           >
//             {/* Status */}
//             <div style={{ padding: "12px 20px", background: pay.status === "completed" ? "#f0fff4" : pay.status === "refunded" ? "#fff5f5" : "#fffbeb", borderBottom: "1px solid #f0f0f0" }}>
//               <InfoRow
//                 label="Payment Status"
//                 value={<Chip label={pay.status?.toUpperCase()} size="small"
//                   color={pay.status === "completed" ? "success" : pay.status === "refunded" ? "error" : "warning"}
//                   sx={{ fontWeight: 700 }} />}
//               />
//             </div>

//             {/* Core details */}
//             <div style={styles.infoGrid}>
//               {pay.invoiceNumber && <InfoRow label="Invoice Number" value={pay.invoiceNumber} />}
//               {pay.invoiceDate   && <InfoRow label="Invoice Date"   value={pay.invoiceDate} />}
//               <InfoRow label="Transaction ID"
//                 value={<code style={styles.code}>{pay.transactionId ?? "—"}</code>} />
//               <InfoRow
//                 label={pay.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
//                 value={<code style={styles.code}>{pay.razorpayOrderId ?? pay.paypalOrderId ?? "—"}</code>}
//               />
//               <InfoRow label="Provider"   value={<span style={{ textTransform: "capitalize" }}>{pay.provider ?? "—"}</span>} />
//               <InfoRow label="Currency"   value={<Chip label={pay.currency ?? "USD"} size="small" color="info" sx={{ fontWeight: 700 }} />} />
//               <InfoRow label="Subtotal"   value={fmtAmount(pay.currency, pay.subtotal)} />
//               {pay.discountAmount > 0 && <InfoRow label="Discount" value={`-${fmtAmount(pay.currency, pay.discountAmount)}`} />}
//               {pay.couponCode && <InfoRow label="Coupon" value={<Chip label={pay.couponCode} size="small" color="success" />} />}
//               {pay.conversionRate   && <InfoRow label="Conversion Rate"  value={`$1 = ₹${pay.conversionRate.toFixed(2)}`} />}
//               {pay.finalAmountUSD   && <InfoRow label="Amount in USD"    value={`$${pay.finalAmountUSD.toFixed(2)}`} />}
//               {pay.paidAt           && <InfoRow label="Paid At"          value={formatDateTime(pay.paidAt)} />}
//             </div>

//             {/* Final Amount */}
//             <div style={styles.finalAmountRow}>
//               <span style={styles.finalAmountLabel}>Final Amount</span>
//               <span style={styles.finalAmountValue}>
//                 {fmtAmount(pay.currency, pay.finalAmount)}
//               </span>
//             </div>

//             {/* Tax Breakdown */}
//             {pay.taxBreakdown && (
//               <>
//                 <SectionDivider label="Tax Breakdown" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Subtotal (Before Tax)" value={`₹${pay.taxBreakdown.subtotal?.toFixed(2) ?? "0.00"}`} />
//                   {pay.taxBreakdown.isDelhi ? (
//                     <>
//                       <InfoRow label="CGST @ 9%" value={`₹${pay.taxBreakdown.cgst?.toFixed(2) ?? "0.00"}`} />
//                       <InfoRow label="SGST @ 9%" value={`₹${pay.taxBreakdown.sgst?.toFixed(2) ?? "0.00"}`} />
//                     </>
//                   ) : (
//                     <InfoRow label="IGST @ 18%" value={`₹${pay.taxBreakdown.igst?.toFixed(2) ?? "0.00"}`} />
//                   )}
//                   <InfoRow label="Total Tax" value={`₹${pay.taxBreakdown.totalTax?.toFixed(2) ?? "0.00"}`} />
//                 </div>
//               </>
//             )}

//             {/* Business Details */}
//             {(pay.companyName || pay.gstNumber) && (
//               <>
//                 <SectionDivider label="Business Details" />
//                 <div style={styles.infoGrid}>
//                   {pay.companyName  && <InfoRow label="Company"        value={pay.companyName} />}
//                   {pay.gstNumber    && <InfoRow label="GST Number"     value={pay.gstNumber} />}
//                   {pay.gstStateCode && <InfoRow label="GST State Code" value={pay.gstStateCode} />}
//                 </div>
//               </>
//             )}

//             {/* Billing Address */}
//             {pay.clientAddress && (
//               <>
//                 <SectionDivider label="Billing Address" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Address"  value={pay.clientAddress} />
//                   <InfoRow label="City"     value={pay.clientCity} />
//                   <InfoRow label="State"    value={pay.clientState} />
//                   <InfoRow label="Pincode"  value={pay.clientPincode} />
//                   <InfoRow label="Country"  value={pay.clientCountry} />
//                 </div>
//               </>
//             )}

//             {/* Payer Information */}
//             {pay.payer && (
//               <>
//                 <SectionDivider label="Payer Information" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Name"     value={pay.payer.name} />
//                   <InfoRow label="Email"    value={pay.payer.email} />
//                   <InfoRow label="Payer ID" value={pay.payer.payerId} />
//                   <InfoRow label="Country"  value={pay.payer.country?.toUpperCase()} />
//                 </div>
//               </>
//             )}

//             {/* Dispute */}
//             {pay.dispute && (
//               <div style={{ padding: "12px 20px", background: pay.dispute.isDisputed ? "#fff5f5" : "#f0fff4", borderTop: "1px solid #f0f0f0" }}>
//                 <InfoRow label="Dispute Status"
//                   value={pay.dispute.isDisputed ? "⚠️ Payment Disputed" : "✓ No Disputes"} />
//               </div>
//             )}

//             {/* Invoice Downloads */}
//             {(pay.invoicePdfUrl || pay.refund?.refundInvoicePdfUrl) && (
//               <div style={styles.invoiceDownload}>
//                 <p style={styles.sectionDividerLabel}>📄 Download Invoices</p>
//                 <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
//                   {pay.invoicePdfUrl && (
//                     <a href={pay.invoicePdfUrl} target="_blank" rel="noopener noreferrer" style={styles.downloadBtn("#198754")}>
//                       ⬇ Purchase Invoice ({pay.invoiceNumber})
//                     </a>
//                   )}
//                   {pay.refund?.refundInvoicePdfUrl && (
//                     <a href={pay.refund.refundInvoicePdfUrl} target="_blank" rel="noopener noreferrer" style={styles.downloadBtn("#dc3545")}>
//                       ↩ Refund Invoice ({pay.refund.refundInvoiceNumber})
//                     </a>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Refund Button */}
//             {pay.status === "completed" && !pay.refund?.isRefunded && (
//               <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0" }}>
//                 <Button variant="contained" color="error" fullWidth onClick={handleRefundClick}
//                   sx={{ py: 1.5, fontWeight: 700, fontSize: 14, textTransform: "none", borderRadius: 2 }}>
//                   ↩ Process Refund via {pay.provider === "razorpay" ? "Razorpay" : "PayPal"}
//                 </Button>
//               </div>
//             )}

//             {/* Refund Info */}
//             {pay.refund?.isRefunded && (
//               <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0" }}>
//                 <div style={styles.refundAlert}>
//                   <p style={{ fontWeight: 700, color: "#155724", marginBottom: 10 }}>
//                     ✅ Refund Processed Successfully
//                   </p>
//                   <div style={styles.infoGrid}>
//                     <InfoRow label="Refund Amount" value={fmtAmount(pay.currency, pay.refund.refundAmount)} accent />
//                     <InfoRow label="Status"    value={<Chip label={pay.refund.refundStatus} size="small" color="success" sx={{ fontWeight: 700, textTransform: "uppercase" }} />} />
//                     <InfoRow label="Refund ID" value={<code style={styles.code}>{pay.refund.refundId}</code>} />
//                     {pay.refund.refundInvoiceNumber && <InfoRow label="Refund Invoice" value={<code style={styles.code}>{pay.refund.refundInvoiceNumber}</code>} />}
//                     <InfoRow label="Refunded At" value={formatDateTime(pay.refund.refundedAt)} />
//                     {pay.refund.refundReason && <InfoRow label="Reason" value={pay.refund.refundReason} />}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Payment History */}
//             {pay.history?.length > 0 && (
//               <>
//                 <SectionDivider label="Payment History" />
//                 <div style={{ padding: "0 0 8px", overflowX: "auto" }}>
//                   <table style={styles.table}>
//                     <thead>
//                       <tr style={styles.theadRow}>
//                         {["Action", "Amount", "Transaction ID", "Reason", "Timestamp", "By"].map((h) => (
//                           <th key={h} style={styles.th}>{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {pay.history.map((event, idx) => (
//                         <tr key={idx} style={styles.tbodyRow}>
//                           <td style={styles.td}>
//                             <Chip label={event.action.toUpperCase()} size="small"
//                               color={event.status === "completed" ? "success" : event.status === "refunded" ? "error" : "warning"}
//                               sx={{ fontSize: 10, fontWeight: 700 }} />
//                           </td>
//                           <td style={{ ...styles.td, fontWeight: 600 }}>{fmtAmount(pay.currency, event.amount)}</td>
//                           <td style={styles.td}><code style={styles.code}>{event.transactionId}</code></td>
//                           <td style={styles.td}>{event.reason ?? "—"}</td>
//                           <td style={{ ...styles.td, fontSize: 12, whiteSpace: "nowrap" }}>{formatDateTime(event.timestamp)}</td>
//                           <td style={styles.td}><Chip label={event.performedBy} size="small" variant="outlined" sx={{ fontSize: 11 }} /></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </Card>
//         )}

//         {/* ── Team ── */}
//         {project?.team && (
//           <Card
//             icon="👥"
//             title="Team Members"
//             action={
//               <Link to={`/dashboard/edit-team/${project.team._id}`}
//                 style={styles.editBtn}>
//                 ✏️ Edit Team
//               </Link>
//             }
//           >
//             <div style={{ overflowX: "auto" }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr style={styles.theadRow}>
//                     {["Role", "Name", "Source", "Rating"].map((h) => (
//                       <th key={h} style={styles.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr style={styles.tbodyRow}>
//                     <td style={{ ...styles.td, fontWeight: 600 }}>{project.team.assistant?.role ?? "—"}</td>
//                     <td style={styles.td}>{project.team.assistant?.staffName ?? "—"}</td>
//                     <td style={styles.td}>
//                       <Chip label={project.team.assistant?.source ?? "Internal"} size="small" variant="outlined" sx={{ fontSize: 11 }} />
//                     </td>
//                     <td style={{ ...styles.td, textAlign: "center" }}>
//                       {assistantRating ? (
//                         <Rating count={5} value={assistantRating.ratingStar} size={18} edit={false} activeColor="#ffa500" />
//                       ) : (
//                         <Button variant="contained" size="small" onClick={() => setOpenModal(true)}
//                           sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#f57c00" }, textTransform: "none", fontSize: 12, borderRadius: 5, px: 2 }}>
//                           ⭐ Rate
//                         </Button>
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         )}
//       </div>

//       {/* ── Rating Modal ── */}
//       <RatingModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSubmit={handleSubmitRating}
//         loading={ratingLoading}
//       />
//     </>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = {
//   pageWrapper: {
//     maxWidth: 960,
//     margin: "0 auto",
//     padding: "24px 16px 48px",
//     display: "flex",
//     flexDirection: "column",
//     gap: 20,
//   },
//   pageHeader: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: 12,
//     marginBottom: 8,
//   },
//   breadcrumb: { margin: "0 0 4px", fontSize: 13, color: "#888" },
//   breadcrumbLink: { color: "#1976d2", textDecoration: "none" },
//   pageTitle: { margin: 0, fontSize: 26, fontWeight: 800, color: "#1a1a2e", letterSpacing: -0.5 },

//   card: {
//     background: "#fff",
//     borderRadius: 12,
//     border: "1px solid #eef0f4",
//     boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//     overflow: "hidden",
//   },
//   cardHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "14px 20px",
//     background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
//     borderBottom: "1px solid #eef0f4",
//   },
//   cardIcon:  { fontSize: 18 },
//   cardTitle: { margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" },

//   overviewGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: 0,
//   },
//   overviewCell: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "16px 20px",
//     borderRight: "1px solid #f0f0f0",
//     borderBottom: "1px solid #f0f0f0",
//   },
//   overviewLabel: { fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 },
//   overviewValue: { fontSize: 15, fontWeight: 600, color: "#1a1a2e" },

//   infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" },
//   infoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     borderBottom: "1px solid #f8f9fa",
//     gap: 12,
//   },
//   infoLabel: { fontSize: 13, color: "#777", fontWeight: 500, minWidth: 130 },
//   infoValue: { fontSize: 14, color: "#1a1a2e", fontWeight: 500, textAlign: "right" },

//   sectionDivider: {
//     background: "#f8f9fa",
//     padding: "8px 20px",
//     borderTop: "1px solid #eef0f4",
//     borderBottom: "1px solid #eef0f4",
//   },
//   sectionDividerLabel: { fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1 },

//   finalAmountRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "16px 20px",
//     background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
//     borderTop: "2px solid #c8e6c9",
//     borderBottom: "1px solid #c8e6c9",
//   },
//   finalAmountLabel: { fontSize: 16, fontWeight: 700, color: "#1a1a2e" },
//   finalAmountValue: { fontSize: 28, fontWeight: 800, color: "#2e7d32" },

//   invoiceDownload: {
//     padding: "14px 20px",
//     background: "#f8f9fa",
//     borderTop: "1px solid #f0f0f0",
//   },
//   downloadBtn: (bg) => ({
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 6,
//     padding: "9px 18px",
//     background: bg,
//     color: "#fff",
//     borderRadius: 8,
//     textDecoration: "none",
//     fontSize: 13,
//     fontWeight: 600,
//   }),

//   refundAlert: {
//     background: "#f0fff4",
//     border: "1px solid #c3e6cb",
//     borderRadius: 8,
//     padding: "14px 16px",
//   },

//   table: { width: "100%", borderCollapse: "collapse" },
//   theadRow: { background: "#f8f9fa" },
//   th: { padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 0.6, borderBottom: "2px solid #eef0f4" },
//   tbodyRow: { borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" },
//   td: { padding: "11px 16px", fontSize: 14, color: "#333" },

//   code: { background: "#f0f4ff", padding: "2px 7px", borderRadius: 4, fontFamily: "monospace", fontSize: 12, color: "#3b4a6b" },

//   editBtn: {
//     display: "inline-block",
//     padding: "6px 14px",
//     background: "#1976d2",
//     color: "#fff",
//     borderRadius: 6,
//     textDecoration: "none",
//     fontSize: 13,
//     fontWeight: 600,
//   },

//   modal: {
//     width: 420,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 3,
//     mx: "auto",
//     mt: "10vh",
//     position: "relative",
//     outline: "none",
//   },
//   modalClose: {
//     position: "absolute",
//     top: 12,
//     right: 14,
//     background: "none",
//     border: "none",
//     fontSize: 24,
//     cursor: "pointer",
//     color: "#555",
//     lineHeight: 1,
//     padding: 0,
//   },
// };

// export default ProjectViewPage;




















// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Typography, Modal, Box, Button, TextField, Chip, CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// const formatDateStr = (dateString) => {
//   if (!dateString) return "—";
//   const [year, month, day] = dateString.split("-");
//   return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" })
//     .format(new Date(year, month - 1, day));
// };

// const formatDateObj = (dateInput) => {
//   if (!dateInput) return "—";
//   return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" })
//     .format(new Date(dateInput));
// };

// const formatDateTime = (dateInput) => {
//   if (!dateInput) return "—";
//   return new Intl.DateTimeFormat("en-US", {
//     day: "2-digit", month: "short", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   }).format(new Date(dateInput));
// };

// const currencySymbol = (currency) => currency === "INR" ? "₹" : "$";
// const fmtAmount = (currency, amount) => `${currencySymbol(currency)}${(amount ?? 0).toFixed(2)}`;

// const STATUS_CONFIG = {
//   completed:          { color: "success", label: "Completed" },
//   running:            { color: "primary", label: "Running" },
//   refunded:           { color: "error",   label: "Refunded" },
//   partially_refunded: { color: "warning", label: "Partial Refund" },
//   new:                { color: "warning", label: "New" },
//   pending:            { color: "warning", label: "Pending" },
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// /** Reusable section card */
// const Card = ({ icon, title, action, children }) => (
//   <div style={styles.card}>
//     <div style={styles.cardHeader}>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <span style={styles.cardIcon}>{icon}</span>
//         <h5 style={styles.cardTitle}>{title}</h5>
//       </div>
//       {action}
//     </div>
//     <div>{children}</div>
//   </div>
// );

// /** Key–value info row */
// const InfoRow = ({ label, value, accent }) => (
//   <div style={styles.infoRow}>
//     <span style={styles.infoLabel}>{label}</span>
//     <span style={{ ...styles.infoValue, ...(accent ? { color: "#2e7d32", fontWeight: 700, fontSize: 18 } : {}) }}>
//       {value}
//     </span>
//   </div>
// );

// /** Divider with label */
// const SectionDivider = ({ label }) => (
//   <div style={styles.sectionDivider}>
//     <span style={styles.sectionDividerLabel}>{label}</span>
//   </div>
// );

// // ─── Rating Modal ─────────────────────────────────────────────────────────────
// const RatingModal = ({ open, onClose, onSubmit, loading }) => {
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");

//   const handleSubmit = () => {
//     onSubmit(ratingValue, feedback);
//     setRatingValue(0);
//     setFeedback("");
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={styles.modal}>
//         <button onClick={onClose} style={styles.modalClose}>&times;</button>
//         <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: 700, color: "#1a1a2e" }}>
//           ⭐ Rate Assistant
//         </Typography>
//         <Box textAlign="center" mb={3}>
//           <Rating count={5} value={ratingValue} onChange={setRatingValue} size={40} activeColor="#ffd700" />
//         </Box>
//         <TextField
//           fullWidth multiline minRows={3}
//           label="Write your feedback..."
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           sx={{ mb: 3 }}
//         />
//         <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//           {loading ? <CircularProgress size={20} color="inherit" /> : "Submit Feedback"}
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// // ─── Combo Services Modal ─────────────────────────────────────────────────────
// const ComboServicesModal = ({ open, onClose, loading, comboData }) => (
//   <Modal open={open} onClose={onClose}>
//     <Box sx={{
//       width: { xs: "90%", sm: 580 },
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       borderRadius: 3,
//       mx: "auto",
//       mt: "8vh",
//       outline: "none",
//       maxHeight: "80vh",
//       overflowY: "auto",
//       position: "relative",
//     }}>
//       {/* Modal Header */}
//       <div style={{
//         padding: "16px 20px",
//         background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
//         borderRadius: "12px 12px 0 0",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}>
//         <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
//           ⚙️ All Services in this Combo
//         </Typography>
//         <button onClick={onClose} style={{ ...styles.modalClose, color: "#fff", top: 0, right: 0, position: "relative" }}>
//           &times;
//         </button>
//       </div>

//       {/* Combo Info */}
//       {comboData && !loading && (
//         <div style={{ padding: "14px 20px", background: "#f0f4ff", borderBottom: "1px solid #e0e7ff" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
//             <div>
//               <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Combo Name</p>
//               <p style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 700, color: "#1a1a2e", textTransform: "capitalize" }}>
//                 {comboData.comboName}
//               </p>
//             </div>
//             <div style={{ textAlign: "right" }}>
//               <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Combo Price</p>
//               <p style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 800, color: "#2e7d32" }}>
//                 ₹{comboData.comboPrice}
//               </p>
//             </div>
//           </div>
//           {comboData.discountPercentage > 0 && (
//             <Chip
//               label={`${comboData.discountPercentage}% Discount Applied`}
//               color="success"
//               size="small"
//               sx={{ mt: 1, fontWeight: 700, fontSize: 11 }}
//             />
//           )}
//         </div>
//       )}

//       {/* Body */}
//       <div style={{ padding: "16px 20px 20px" }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" py={5}>
//             <CircularProgress />
//           </Box>
//         ) : !comboData || !comboData.services?.length ? (
//           <Typography color="text.secondary" textAlign="center" py={4}>
//             No services found for this combo.
//           </Typography>
//         ) : (
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.theadRow}>
//                 {["#", "Service Name", "Original Price"].map((h) => (
//                   <th key={h} style={styles.th}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {comboData.services.map((s, idx) => (
//                 <tr key={idx} style={styles.tbodyRow}>
//                   <td style={{ ...styles.td, color: "#999", fontSize: 12 }}>{idx + 1}</td>
//                   <td style={{ ...styles.td, fontWeight: 600, textTransform: "capitalize" }}>
//                     {s.serviceName}
//                   </td>
//                   <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>
//                     ₹{s.originalPrice}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </Box>
//   </Modal>
// );

// // ─── Custom Hook ─────────────────────────────────────────────────────────────
// const useProject = (projectId) => {
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProject = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => { fetchProject(); }, [fetchProject]);

//   return { project, loading, refetch: fetchProject };
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ProjectViewPage = () => {
//   const { projectId }  = useParams();
//   const packageAllData = useSelector((s) => s.package.data);
//   const ratingAllData  = useSelector((s) => s.rating.data);
//   const dispatch       = useDispatch();

//   const [openModal, setOpenModal]         = useState(false);
//   const [ratingLoading, setRatingLoading] = useState(false);

//   // ── Combo Modal State ──
//   const [comboModal, setComboModal]   = useState(false);
//   const [comboLoading, setComboLoading] = useState(false);
//   const [comboData, setComboData]     = useState(null);

//   const { project, loading, refetch } = useProject(projectId);

//   const assistantRating = useMemo(() =>
//     ratingAllData?.find(
//       (r) => r.projectId === project?._id && r.employ === project?.team?.assistant?.staffId
//     ), [ratingAllData, project]);

//   const packageName = useMemo(() => {
//     if (project?.projectType !== "package") return "Custom Package";
//     return packageAllData?.find((p) => p._id === project.packageId)?.packageName ?? "—";
//   }, [project, packageAllData]);

//   const statusCfg = STATUS_CONFIG[project?.projectStatus] ?? { color: "default", label: project?.projectStatus };

//   // ─── Show All Services Handler ──────────────────────────────────────────────
//   const handleShowAllServices = async (serviceId) => {
//     if (!serviceId) return;
//     setComboData(null);
//     setComboModal(true);
//     setComboLoading(true);
//     try {
//       const { data } = await axios.get(`${Url}/api/combo/combo-service/${serviceId}`);
//       setComboData(data);
//     } catch (err) {
//       console.error("Error fetching combo services:", err);
//       setComboData(null);
//     } finally {
//       setComboLoading(false);
//     }
//   };

//   // ─── Rating Submit ──────────────────────────────────────────────────────────
//   const handleSubmitRating = async (ratingValue, feedback) => {
//     if (!ratingValue) return Swal.fire("Warning", "Please select a rating.", "warning");
//     setRatingLoading(true);
//     try {
//       await axios.post(`${Url}/rating/add-assistant-rating`, {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       });
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       dispatch(projectdata());
//     } catch {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setRatingLoading(false);
//     }
//   };

//   // ─── Refund Handler ─────────────────────────────────────────────────────────
//   const handleRefundClick = async () => {
//     const { payment } = project;
//     const provider  = payment?.provider ?? "unknown";
//     const paymentId = payment?.razorpayPaymentId ?? payment?.paypalOrderId;
//     const maxAmount = payment?.finalAmount ?? 0;
//     const currency  = payment?.currency ?? "USD";
//     const symbol    = currencySymbol(currency);
//     const endpoint  = provider === "razorpay"
//       ? `${Url}/api/razorpay/refund-order`
//       : `${Url}/paypal/refund-order`;

//     const result = await Swal.fire({
//       title: "Process Refund?",
//       html: `
//         <div style="text-align:left;padding:10px">
//           <div style="background:#f0f4ff;padding:14px;border-radius:8px;margin-bottom:16px;border-left:4px solid #3b82f6">
//             <p style="margin:4px 0"><strong>Provider:</strong> <span style="text-transform:uppercase;font-weight:700;color:#3b82f6">${provider}</span></p>
//             <p style="margin:4px 0"><strong>Payment ID:</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:3px">${paymentId}</code></p>
//             <p style="margin:12px 0 4px;font-size:17px"><strong>Total:</strong> <span style="color:#d9534f;font-size:22px;font-weight:700">${symbol}${maxAmount.toFixed(2)}</span></p>
//           </div>
//           <label style="font-weight:600;display:block;margin-bottom:6px">Refund Amount (leave empty for full)</label>
//           <input id="refund-amount" class="swal2-input" placeholder="Enter amount" type="number" step="0.01" min="0.01" max="${maxAmount}" style="width:100%;margin:0 0 12px" />
//           <label style="font-weight:600;display:block;margin-bottom:6px">Reason (optional)</label>
//           <textarea id="refund-reason" class="swal2-textarea" placeholder="Refund reason..." style="width:100%;min-height:70px"></textarea>
//         </div>`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Process Refund",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#6c757d",
//       width: "560px",
//       preConfirm: () => {
//         const amount = document.getElementById("refund-amount").value.trim();
//         const reason = document.getElementById("refund-reason").value.trim();
//         if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount)) {
//           Swal.showValidationMessage(`Amount must be between ${symbol}0.01 and ${symbol}${maxAmount.toFixed(2)}`);
//           return false;
//         }
//         return { amount: amount ? parseFloat(amount) : null, reason: reason || "Refund requested by admin" };
//       },
//     });

//     if (!result.isConfirmed) return;

//     try {
//       Swal.fire({
//         title: "Processing...", allowOutsideClick: false, showConfirmButton: false,
//         html: `<div style="text-align:center;padding:20px"><div class="spinner-border text-primary" style="width:3rem;height:3rem"></div><p style="margin-top:12px;color:#666">Please wait...</p></div>`,
//       });

//       const { data } = await axios.post(endpoint,
//         { projectId: project._id, amount: result.value.amount, reason: result.value.reason },
//         { headers: { authorization: localStorage.getItem("token") } }
//       );

//       const refunded = data.amount ?? result.value.amount ?? maxAmount;
//       Swal.fire({
//         icon: "success", title: "Refund Successful!",
//         html: `<div style="background:#d4edda;padding:14px;border-radius:8px;border-left:4px solid #28a745;text-align:left">
//           <p style="margin:4px 0"><strong>Refund ID:</strong> <code>${data.refundId}</code></p>
//           ${data.refundInvoiceNumber ? `<p style="margin:4px 0"><strong>Invoice:</strong> <code>${data.refundInvoiceNumber}</code></p>` : ""}
//           <p style="margin:4px 0"><strong>Amount:</strong> <span style="color:#28a745;font-size:20px;font-weight:700">${symbol}${refunded.toFixed(2)}</span></p>
//           <p style="margin:10px 0 0;font-size:12px;color:#555;text-align:center">Credited within 5–7 business days</p></div>`,
//         confirmButtonColor: "#28a745",
//       });
//       await refetch();
//     } catch (error) {
//       const msg     = error.response?.data?.message ?? "Refund failed";
//       const details = error.response?.data?.details ?? error.response?.data?.error ?? error.message;
//       Swal.fire({
//         icon: "error", title: "Refund Failed",
//         html: `<div style="background:#f8d7da;padding:14px;border-radius:8px;border-left:4px solid #d9534f;text-align:left">
//           <p style="font-weight:700;color:#721c24;margin:0 0 8px">${msg}</p>
//           ${details ? `<code style="font-size:12px;color:#555">${details}</code>` : ""}</div>`,
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//       <CircularProgress size={48} />
//     </Box>
//   );

//   const pay = project?.payment;

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Project View — {projectId}</title></Helmet>
//       <div style={styles.pageWrapper}>

//         {/* ── Page Header ── */}
//         <div style={styles.pageHeader}>
//           <div>
//             <p style={styles.breadcrumb}>
//               <Link to="/dashboard/app" style={styles.breadcrumbLink}>Dashboard</Link>
//               {" / "}
//               <Link to="/dashboard/complete-project" style={styles.breadcrumbLink}>Projects</Link>
//               {" / View"}
//             </p>
//             <h1 style={styles.pageTitle}>Project Details</h1>
//           </div>
//           <Chip
//             label={statusCfg.label}
//             color={statusCfg.color}
//             sx={{ fontWeight: 700, fontSize: 13, px: 1.5, py: 2.5, textTransform: "uppercase", letterSpacing: 1 }}
//           />
//         </div>

//         {/* ── Overview ── */}
//         <Card icon="📁" title="Project Overview">
//           <div style={styles.overviewGrid}>
//             {[
//               { label: "Project ID",  value: <code style={styles.code}>{project?._id}</code> },
//               { label: "Client",      value: <span style={{ textTransform: "capitalize" }}>{project?.clientName}</span> },
//               { label: "Package",     value: packageName },
//               { label: "Total Price", value: `$${project?.totalPrice}`, accent: true },
//             ].map(({ label, value, accent }) => (
//               <div key={label} style={styles.overviewCell}>
//                 <span style={styles.overviewLabel}>{label}</span>
//                 <span style={{ ...styles.overviewValue, ...(accent ? { color: "#2e7d32", fontSize: 22, fontWeight: 700 } : {}) }}>
//                   {value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* ── Services ── */}
//         {project?.service?.length > 0 && (
//           <Card icon="⚙️" title="Services">
//             <div style={{ overflowX: "auto" }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr style={styles.theadRow}>
//                     {["Service", "Duration", "Price", "Status", ""].map((h) => (
//                       <th key={h} style={styles.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project.service.map((svc, idx) => (
//                     <tr key={idx} style={styles.tbodyRow}>
//                       <td style={{ ...styles.td, fontWeight: 600, textTransform: "capitalize" }}>
//                         {svc.serviceName || svc.serviceTitle || "—"}
//                       </td>
//                       <td style={{ ...styles.td, fontSize: 13, color: "#666" }}>
//                         {svc.serviceStart ? `${formatDateStr(svc.serviceStart)} – ${formatDateStr(svc.serviceEnd)}` : "—"}
//                       </td>
//                       <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>${svc.price}</td>
//                       <td style={styles.td}>
//                         <Chip
//                           label={project.projectStatus}
//                           color={statusCfg.color}
//                           size="small"
//                           sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}
//                         />
//                       </td>
//                       {/* ── Show All Services Button — sirf combo type pe dikhega ── */}
//                       <td style={styles.td}>
//                         {svc.serviceId && (
//                           <Button
//                             variant="contained"
//                             size="small"
//                             onClick={() => handleShowAllServices(svc.serviceId)}
//                             sx={{
//                               backgroundColor: "#1976d2",
//                               "&:hover": { backgroundColor: "#1565c0" },
//                               textTransform: "none",
//                               fontSize: 12,
//                               borderRadius: 5,
//                               px: 2,
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             show all services
//                           </Button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         )}

//         {/* ── Payment Details ── */}
//         {pay && (
//           <Card
//             icon="💳"
//             title="Payment Details"
//             action={pay.provider && (
//               <Chip
//                 label={pay.provider === "razorpay" ? "💳 Razorpay" : "🅿️ PayPal"}
//                 variant="outlined"
//                 size="small"
//                 sx={{ fontWeight: 700, fontSize: 12 }}
//               />
//             )}
//           >
//             {/* Status */}
//             <div style={{ padding: "12px 20px", background: pay.status === "completed" ? "#f0fff4" : pay.status === "refunded" ? "#fff5f5" : "#fffbeb", borderBottom: "1px solid #f0f0f0" }}>
//               <InfoRow
//                 label="Payment Status"
//                 value={<Chip label={pay.status?.toUpperCase()} size="small"
//                   color={pay.status === "completed" ? "success" : pay.status === "refunded" ? "error" : "warning"}
//                   sx={{ fontWeight: 700 }} />}
//               />
//             </div>

//             {/* Core details */}
//             <div style={styles.infoGrid}>
//               {pay.invoiceNumber && <InfoRow label="Invoice Number" value={pay.invoiceNumber} />}
//               {pay.invoiceDate   && <InfoRow label="Invoice Date"   value={pay.invoiceDate} />}
//               <InfoRow label="Transaction ID"
//                 value={<code style={styles.code}>{pay.transactionId ?? "—"}</code>} />
//               <InfoRow
//                 label={pay.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
//                 value={<code style={styles.code}>{pay.razorpayOrderId ?? pay.paypalOrderId ?? "—"}</code>}
//               />
//               <InfoRow label="Provider"   value={<span style={{ textTransform: "capitalize" }}>{pay.provider ?? "—"}</span>} />
//               <InfoRow label="Currency"   value={<Chip label={pay.currency ?? "USD"} size="small" color="info" sx={{ fontWeight: 700 }} />} />
//               <InfoRow label="Subtotal"   value={fmtAmount(pay.currency, pay.subtotal)} />
//               {pay.discountAmount > 0 && <InfoRow label="Discount" value={`-${fmtAmount(pay.currency, pay.discountAmount)}`} />}
//               {pay.couponCode && <InfoRow label="Coupon" value={<Chip label={pay.couponCode} size="small" color="success" />} />}
//               {pay.conversionRate   && <InfoRow label="Conversion Rate"  value={`$1 = ₹${pay.conversionRate.toFixed(2)}`} />}
//               {pay.finalAmountUSD   && <InfoRow label="Amount in USD"    value={`$${pay.finalAmountUSD.toFixed(2)}`} />}
//               {pay.paidAt           && <InfoRow label="Paid At"          value={formatDateTime(pay.paidAt)} />}
//             </div>

//             {/* Final Amount */}
//             <div style={styles.finalAmountRow}>
//               <span style={styles.finalAmountLabel}>Final Amount</span>
//               <span style={styles.finalAmountValue}>
//                 {fmtAmount(pay.currency, pay.finalAmount)}
//               </span>
//             </div>

//             {/* Tax Breakdown */}
//             {pay.taxBreakdown && (
//               <>
//                 <SectionDivider label="Tax Breakdown" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Subtotal (Before Tax)" value={`₹${pay.taxBreakdown.subtotal?.toFixed(2) ?? "0.00"}`} />
//                   {pay.taxBreakdown.isDelhi ? (
//                     <>
//                       <InfoRow label="CGST @ 9%" value={`₹${pay.taxBreakdown.cgst?.toFixed(2) ?? "0.00"}`} />
//                       <InfoRow label="SGST @ 9%" value={`₹${pay.taxBreakdown.sgst?.toFixed(2) ?? "0.00"}`} />
//                     </>
//                   ) : (
//                     <InfoRow label="IGST @ 18%" value={`₹${pay.taxBreakdown.igst?.toFixed(2) ?? "0.00"}`} />
//                   )}
//                   <InfoRow label="Total Tax" value={`₹${pay.taxBreakdown.totalTax?.toFixed(2) ?? "0.00"}`} />
//                 </div>
//               </>
//             )}

//             {/* Business Details */}
//             {(pay.companyName || pay.gstNumber) && (
//               <>
//                 <SectionDivider label="Business Details" />
//                 <div style={styles.infoGrid}>
//                   {pay.companyName  && <InfoRow label="Company"        value={pay.companyName} />}
//                   {pay.gstNumber    && <InfoRow label="GST Number"     value={pay.gstNumber} />}
//                   {pay.gstStateCode && <InfoRow label="GST State Code" value={pay.gstStateCode} />}
//                 </div>
//               </>
//             )}

//             {/* Billing Address */}
//             {pay.clientAddress && (
//               <>
//                 <SectionDivider label="Billing Address" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Address"  value={pay.clientAddress} />
//                   <InfoRow label="City"     value={pay.clientCity} />
//                   <InfoRow label="State"    value={pay.clientState} />
//                   <InfoRow label="Pincode"  value={pay.clientPincode} />
//                   <InfoRow label="Country"  value={pay.clientCountry} />
//                 </div>
//               </>
//             )}

//             {/* Payer Information */}
//             {pay.payer && (
//               <>
//                 <SectionDivider label="Payer Information" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Name"     value={pay.payer.name} />
//                   <InfoRow label="Email"    value={pay.payer.email} />
//                   <InfoRow label="Payer ID" value={pay.payer.payerId} />
//                   <InfoRow label="Country"  value={pay.payer.country?.toUpperCase()} />
//                 </div>
//               </>
//             )}

//             {/* Dispute */}
//             {pay.dispute && (
//               <div style={{ padding: "12px 20px", background: pay.dispute.isDisputed ? "#fff5f5" : "#f0fff4", borderTop: "1px solid #f0f0f0" }}>
//                 <InfoRow label="Dispute Status"
//                   value={pay.dispute.isDisputed ? "⚠️ Payment Disputed" : "✓ No Disputes"} />
//               </div>
//             )}

//             {/* Invoice Downloads */}
//             {(pay.invoicePdfUrl || pay.refund?.refundInvoicePdfUrl) && (
//               <div style={styles.invoiceDownload}>
//                 <p style={styles.sectionDividerLabel}>📄 Download Invoices</p>
//                 <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
//                   {pay.invoicePdfUrl && (
//                     <a href={pay.invoicePdfUrl} target="_blank" rel="noopener noreferrer" style={styles.downloadBtn("#198754")}>
//                       ⬇ Purchase Invoice ({pay.invoiceNumber})
//                     </a>
//                   )}
//                   {pay.refund?.refundInvoicePdfUrl && (
//                     <a href={pay.refund.refundInvoicePdfUrl} target="_blank" rel="noopener noreferrer" style={styles.downloadBtn("#dc3545")}>
//                       ↩ Refund Invoice ({pay.refund.refundInvoiceNumber})
//                     </a>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Refund Button */}
//             {pay.status === "completed" && !pay.refund?.isRefunded && (
//               <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0" }}>
//                 <Button variant="contained" color="error" fullWidth onClick={handleRefundClick}
//                   sx={{ py: 1.5, fontWeight: 700, fontSize: 14, textTransform: "none", borderRadius: 2 }}>
//                   ↩ Process Refund via {pay.provider === "razorpay" ? "Razorpay" : "PayPal"}
//                 </Button>
//               </div>
//             )}

//             {/* Refund Info */}
//             {pay.refund?.isRefunded && (
//               <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0" }}>
//                 <div style={styles.refundAlert}>
//                   <p style={{ fontWeight: 700, color: "#155724", marginBottom: 10 }}>
//                     ✅ Refund Processed Successfully
//                   </p>
//                   <div style={styles.infoGrid}>
//                     <InfoRow label="Refund Amount" value={fmtAmount(pay.currency, pay.refund.refundAmount)} accent />
//                     <InfoRow label="Status"    value={<Chip label={pay.refund.refundStatus} size="small" color="success" sx={{ fontWeight: 700, textTransform: "uppercase" }} />} />
//                     <InfoRow label="Refund ID" value={<code style={styles.code}>{pay.refund.refundId}</code>} />
//                     {pay.refund.refundInvoiceNumber && <InfoRow label="Refund Invoice" value={<code style={styles.code}>{pay.refund.refundInvoiceNumber}</code>} />}
//                     <InfoRow label="Refunded At" value={formatDateTime(pay.refund.refundedAt)} />
//                     {pay.refund.refundReason && <InfoRow label="Reason" value={pay.refund.refundReason} />}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Payment History */}
//             {pay.history?.length > 0 && (
//               <>
//                 <SectionDivider label="Payment History" />
//                 <div style={{ padding: "0 0 8px", overflowX: "auto" }}>
//                   <table style={styles.table}>
//                     <thead>
//                       <tr style={styles.theadRow}>
//                         {["Action", "Amount", "Transaction ID", "Reason", "Timestamp", "By"].map((h) => (
//                           <th key={h} style={styles.th}>{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {pay.history.map((event, idx) => (
//                         <tr key={idx} style={styles.tbodyRow}>
//                           <td style={styles.td}>
//                             <Chip label={event.action.toUpperCase()} size="small"
//                               color={event.status === "completed" ? "success" : event.status === "refunded" ? "error" : "warning"}
//                               sx={{ fontSize: 10, fontWeight: 700 }} />
//                           </td>
//                           <td style={{ ...styles.td, fontWeight: 600 }}>{fmtAmount(pay.currency, event.amount)}</td>
//                           <td style={styles.td}><code style={styles.code}>{event.transactionId}</code></td>
//                           <td style={styles.td}>{event.reason ?? "—"}</td>
//                           <td style={{ ...styles.td, fontSize: 12, whiteSpace: "nowrap" }}>{formatDateTime(event.timestamp)}</td>
//                           <td style={styles.td}><Chip label={event.performedBy} size="small" variant="outlined" sx={{ fontSize: 11 }} /></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </Card>
//         )}

//         {/* ── Team ── */}
//         {project?.team && (
//           <Card
//             icon="👥"
//             title="Team Members"
//             action={
//               <Link to={`/dashboard/edit-team/${project.team._id}`} style={styles.editBtn}>
//                 ✏️ Edit Team
//               </Link>
//             }
//           >
//             <div style={{ overflowX: "auto" }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr style={styles.theadRow}>
//                     {["Role", "Name", "Source", "Rating"].map((h) => (
//                       <th key={h} style={styles.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr style={styles.tbodyRow}>
//                     <td style={{ ...styles.td, fontWeight: 600 }}>{project.team.assistant?.role ?? "—"}</td>
//                     <td style={styles.td}>{project.team.assistant?.staffName ?? "—"}</td>
//                     <td style={styles.td}>
//                       <Chip label={project.team.assistant?.source ?? "Internal"} size="small" variant="outlined" sx={{ fontSize: 11 }} />
//                     </td>
//                     <td style={{ ...styles.td, textAlign: "center" }}>
//                       {assistantRating ? (
//                         <Rating count={5} value={assistantRating.ratingStar} size={18} edit={false} activeColor="#ffa500" />
//                       ) : (
//                         <Button variant="contained" size="small" onClick={() => setOpenModal(true)}
//                           sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#f57c00" }, textTransform: "none", fontSize: 12, borderRadius: 5, px: 2 }}>
//                           ⭐ Rate
//                         </Button>
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         )}
//       </div>

//       {/* ── Rating Modal ── */}
//       <RatingModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSubmit={handleSubmitRating}
//         loading={ratingLoading}
//       />

//       {/* ── Combo Services Modal ── */}
//       <ComboServicesModal
//         open={comboModal}
//         onClose={() => { setComboModal(false); setComboData(null); }}
//         loading={comboLoading}
//         comboData={comboData}
//       />
//     </>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = {
//   pageWrapper: {
//     maxWidth: 960,
//     margin: "0 auto",
//     padding: "24px 16px 48px",
//     display: "flex",
//     flexDirection: "column",
//     gap: 20,
//   },
//   pageHeader: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: 12,
//     marginBottom: 8,
//   },
//   breadcrumb: { margin: "0 0 4px", fontSize: 13, color: "#888" },
//   breadcrumbLink: { color: "#1976d2", textDecoration: "none" },
//   pageTitle: { margin: 0, fontSize: 26, fontWeight: 800, color: "#1a1a2e", letterSpacing: -0.5 },

//   card: {
//     background: "#fff",
//     borderRadius: 12,
//     border: "1px solid #eef0f4",
//     boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//     overflow: "hidden",
//   },
//   cardHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "14px 20px",
//     background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
//     borderBottom: "1px solid #eef0f4",
//   },
//   cardIcon:  { fontSize: 18 },
//   cardTitle: { margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" },

//   overviewGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: 0,
//   },
//   overviewCell: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "16px 20px",
//     borderRight: "1px solid #f0f0f0",
//     borderBottom: "1px solid #f0f0f0",
//   },
//   overviewLabel: { fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 },
//   overviewValue: { fontSize: 15, fontWeight: 600, color: "#1a1a2e" },

//   infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" },
//   infoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     borderBottom: "1px solid #f8f9fa",
//     gap: 12,
//   },
//   infoLabel: { fontSize: 13, color: "#777", fontWeight: 500, minWidth: 130 },
//   infoValue: { fontSize: 14, color: "#1a1a2e", fontWeight: 500, textAlign: "right" },

//   sectionDivider: {
//     background: "#f8f9fa",
//     padding: "8px 20px",
//     borderTop: "1px solid #eef0f4",
//     borderBottom: "1px solid #eef0f4",
//   },
//   sectionDividerLabel: { fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1 },

//   finalAmountRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "16px 20px",
//     background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
//     borderTop: "2px solid #c8e6c9",
//     borderBottom: "1px solid #c8e6c9",
//   },
//   finalAmountLabel: { fontSize: 16, fontWeight: 700, color: "#1a1a2e" },
//   finalAmountValue: { fontSize: 28, fontWeight: 800, color: "#2e7d32" },

//   invoiceDownload: {
//     padding: "14px 20px",
//     background: "#f8f9fa",
//     borderTop: "1px solid #f0f0f0",
//   },
//   downloadBtn: (bg) => ({
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 6,
//     padding: "9px 18px",
//     background: bg,
//     color: "#fff",
//     borderRadius: 8,
//     textDecoration: "none",
//     fontSize: 13,
//     fontWeight: 600,
//   }),

//   refundAlert: {
//     background: "#f0fff4",
//     border: "1px solid #c3e6cb",
//     borderRadius: 8,
//     padding: "14px 16px",
//   },

//   table: { width: "100%", borderCollapse: "collapse" },
//   theadRow: { background: "#f8f9fa" },
//   th: { padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 0.6, borderBottom: "2px solid #eef0f4" },
//   tbodyRow: { borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" },
//   td: { padding: "11px 16px", fontSize: 14, color: "#333" },

//   code: { background: "#f0f4ff", padding: "2px 7px", borderRadius: 4, fontFamily: "monospace", fontSize: 12, color: "#3b4a6b" },

//   editBtn: {
//     display: "inline-block",
//     padding: "6px 14px",
//     background: "#1976d2",
//     color: "#fff",
//     borderRadius: 6,
//     textDecoration: "none",
//     fontSize: 13,
//     fontWeight: 600,
//   },

//   modal: {
//     width: 420,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 3,
//     mx: "auto",
//     mt: "10vh",
//     position: "relative",
//     outline: "none",
//   },
//   modalClose: {
//     position: "absolute",
//     top: 12,
//     right: 14,
//     background: "none",
//     border: "none",
//     fontSize: 24,
//     cursor: "pointer",
//     color: "#555",
//     lineHeight: 1,
//     padding: 0,
//   },
// };

// export default ProjectViewPage;











// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container, Typography, Modal, Box, Button, TextField, Chip, CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import Rating from "react-rating-stars-component";
// import axios from "axios";
// import { Url } from "src/url/url";
// import { SingleProject } from "src/Api/Api";
// import { projectdata } from "src/redux/slice/project";

// // ─── Helpers ─────────────────────────────────────────────────────────────────
// const formatDateStr = (dateString) => {
//   if (!dateString) return "—";
//   const [year, month, day] = dateString.split("-");
//   return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" })
//     .format(new Date(year, month - 1, day));
// };

// const formatDateObj = (dateInput) => {
//   if (!dateInput) return "—";
//   return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long", year: "numeric" })
//     .format(new Date(dateInput));
// };

// const formatDateTime = (dateInput) => {
//   if (!dateInput) return "—";
//   return new Intl.DateTimeFormat("en-US", {
//     day: "2-digit", month: "short", year: "numeric",
//     hour: "2-digit", minute: "2-digit",
//   }).format(new Date(dateInput));
// };

// const currencySymbol = (currency) => currency === "INR" ? "₹" : "$";
// const fmtAmount = (currency, amount) => `${currencySymbol(currency)}${(amount ?? 0).toFixed(2)}`;

// const STATUS_CONFIG = {
//   completed:          { color: "success", label: "Completed" },
//   running:            { color: "primary", label: "Running" },
//   refunded:           { color: "error",   label: "Refunded" },
//   partially_refunded: { color: "warning", label: "Partial Refund" },
//   new:                { color: "warning", label: "New" },
//   pending:            { color: "warning", label: "Pending" },
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// const Card = ({ icon, title, action, children }) => (
//   <div style={styles.card}>
//     <div style={styles.cardHeader}>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <span style={styles.cardIcon}>{icon}</span>
//         <h5 style={styles.cardTitle}>{title}</h5>
//       </div>
//       {action}
//     </div>
//     <div>{children}</div>
//   </div>
// );

// const InfoRow = ({ label, value, accent }) => (
//   <div style={styles.infoRow}>
//     <span style={styles.infoLabel}>{label}</span>
//     <span style={{ ...styles.infoValue, ...(accent ? { color: "#2e7d32", fontWeight: 700, fontSize: 18 } : {}) }}>
//       {value}
//     </span>
//   </div>
// );

// const SectionDivider = ({ label }) => (
//   <div style={styles.sectionDivider}>
//     <span style={styles.sectionDividerLabel}>{label}</span>
//   </div>
// );

// // ─── Rating Modal ─────────────────────────────────────────────────────────────
// const RatingModal = ({ open, onClose, onSubmit, loading }) => {
//   const [ratingValue, setRatingValue] = useState(0);
//   const [feedback, setFeedback] = useState("");

//   const handleSubmit = () => {
//     onSubmit(ratingValue, feedback);
//     setRatingValue(0);
//     setFeedback("");
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={styles.modal}>
//         <button onClick={onClose} style={styles.modalClose}>&times;</button>
//         <Typography variant="h6" sx={{ mb: 2, textAlign: "center", fontWeight: 700, color: "#1a1a2e" }}>
//           ⭐ Rate Assistant
//         </Typography>
//         <Box textAlign="center" mb={3}>
//           <Rating count={5} value={ratingValue} onChange={setRatingValue} size={40} activeColor="#ffd700" />
//         </Box>
//         <TextField
//           fullWidth multiline minRows={3}
//           label="Write your feedback..."
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           sx={{ mb: 3 }}
//         />
//         <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
//           {loading ? <CircularProgress size={20} color="inherit" /> : "Submit Feedback"}
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// // ─── Combo Services Modal ─────────────────────────────────────────────────────
// const ComboServicesModal = ({ open, onClose, loading, comboData }) => (
//   <Modal open={open} onClose={onClose}>
//     <Box sx={{
//       width: { xs: "90%", sm: 580 },
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       borderRadius: 3,
//       mx: "auto",
//       mt: "8vh",
//       outline: "none",
//       maxHeight: "80vh",
//       overflowY: "auto",
//       position: "relative",
//     }}>
//       <div style={{
//         padding: "16px 20px",
//         background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
//         borderRadius: "12px 12px 0 0",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}>
//         <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
//           ⚙️ All Services in this Combo
//         </Typography>
//         <button onClick={onClose} style={{ ...styles.modalClose, color: "#fff", top: 0, right: 0, position: "relative" }}>
//           &times;
//         </button>
//       </div>

//       {comboData && !loading && (
//         <div style={{ padding: "14px 20px", background: "#f0f4ff", borderBottom: "1px solid #e0e7ff" }}>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
//             <div>
//               <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Combo Name</p>
//               <p style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 700, color: "#1a1a2e", textTransform: "capitalize" }}>
//                 {comboData.comboName}
//               </p>
//             </div>
//             <div style={{ textAlign: "right" }}>
//               <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>Combo Price</p>
//               <p style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 800, color: "#2e7d32" }}>
//                 ₹{comboData.comboPrice}
//               </p>
//             </div>
//           </div>
//           {comboData.discountPercentage > 0 && (
//             <Chip
//               label={`${comboData.discountPercentage}% Discount Applied`}
//               color="success"
//               size="small"
//               sx={{ mt: 1, fontWeight: 700, fontSize: 11 }}
//             />
//           )}
//         </div>
//       )}

//       <div style={{ padding: "16px 20px 20px" }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" py={5}>
//             <CircularProgress />
//           </Box>
//         ) : !comboData || !comboData.services?.length ? (
//           <Typography color="text.secondary" textAlign="center" py={4}>
//             No services found for this combo.
//           </Typography>
//         ) : (
//           <table style={styles.table}>
//             <thead>
//               <tr style={styles.theadRow}>
//                 {["#", "Service Name", "Original Price"].map((h) => (
//                   <th key={h} style={styles.th}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {comboData.services.map((s, idx) => (
//                 <tr key={idx} style={styles.tbodyRow}>
//                   <td style={{ ...styles.td, color: "#999", fontSize: 12 }}>{idx + 1}</td>
//                   <td style={{ ...styles.td, fontWeight: 600, textTransform: "capitalize" }}>{s.serviceName}</td>
//                   <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>₹{s.originalPrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </Box>
//   </Modal>
// );

// // ─── Custom Hook ─────────────────────────────────────────────────────────────
// const useProject = (projectId) => {
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProject = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
//       setProject(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [projectId]);

//   useEffect(() => { fetchProject(); }, [fetchProject]);

//   return { project, loading, refetch: fetchProject };
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const ProjectViewPage = () => {
//   const { projectId }  = useParams();
//   const packageAllData = useSelector((s) => s.package.data);
//   const ratingAllData  = useSelector((s) => s.rating.data);
//   const dispatch       = useDispatch();

//   const [openModal, setOpenModal]         = useState(false);
//   const [ratingLoading, setRatingLoading] = useState(false);
//   const [comboModal, setComboModal]       = useState(false);
//   const [comboLoading, setComboLoading]   = useState(false);
//   const [comboData, setComboData]         = useState(null);

//   // ── Set of serviceIds jo comboservices collection mein hain ──
//   // { "serviceId1": true, "serviceId2": false, ... }
//   const [comboServiceIds, setComboServiceIds] = useState({});

//   const { project, loading, refetch } = useProject(projectId);

//   // ─── useEffect: project load hone ke baad saari serviceIds check karo ──────
//   useEffect(() => {
//     if (!project?.service?.length) return;

//     const serviceIds = project.service
//       .map(s => s.serviceId)
//       .filter(Boolean);

//     if (!serviceIds.length) return;

//     // Har serviceId ke liye combo API hit karo — jo 200 de woh combo hai
//     const checkCombos = async () => {
//       const results = {};
//       await Promise.all(
//         serviceIds.map(async (id) => {
//           try {
//             await axios.get(`${Url}/api/combo/combo-service/${id}`);
//             results[id] = true;  // combo collection mein mila → combo hai
//           } catch {
//             results[id] = false; // 404 ya error → regular service hai
//           }
//         })
//       );
//       setComboServiceIds(results);
//     };

//     checkCombos();
//   }, [project]);

//   const assistantRating = useMemo(() =>
//     ratingAllData?.find(
//       (r) => r.projectId === project?._id && r.employ === project?.team?.assistant?.staffId
//     ), [ratingAllData, project]);

//   const packageName = useMemo(() => {
//     if (project?.projectType !== "package") return "Custom Package";
//     return packageAllData?.find((p) => p._id === project.packageId)?.packageName ?? "—";
//   }, [project, packageAllData]);

//   const statusCfg = STATUS_CONFIG[project?.projectStatus] ?? { color: "default", label: project?.projectStatus };

//   // ─── Show All Services Handler ─────────────────────────────────────────────
//   const handleShowAllServices = async (serviceId) => {
//     if (!serviceId) return;
//     setComboData(null);
//     setComboModal(true);
//     setComboLoading(true);
//     try {
//       const { data } = await axios.get(`${Url}/api/combo/combo-service/${serviceId}`);
//       setComboData(data);
//     } catch (err) {
//       console.error("Error fetching combo services:", err);
//       setComboData(null);
//     } finally {
//       setComboLoading(false);
//     }
//   };

//   // ─── Rating Submit ─────────────────────────────────────────────────────────
//   const handleSubmitRating = async (ratingValue, feedback) => {
//     if (!ratingValue) return Swal.fire("Warning", "Please select a rating.", "warning");
//     setRatingLoading(true);
//     try {
//       await axios.post(`${Url}/rating/add-assistant-rating`, {
//         projectId: project?._id,
//         teamId: project?.team?._id,
//         employ: project?.team?.assistant?.staffId,
//         clientId: project?.clientId?._id || project?.clientId,
//         clientName: project?.clientName,
//         ratingStar: ratingValue,
//         ratingComment: feedback,
//       });
//       Swal.fire("Success", "Rating submitted successfully!", "success");
//       setOpenModal(false);
//       dispatch(projectdata());
//     } catch {
//       Swal.fire("Error", "Something went wrong while submitting rating.", "error");
//     } finally {
//       setRatingLoading(false);
//     }
//   };

//   // ─── Refund Handler ────────────────────────────────────────────────────────
//   const handleRefundClick = async () => {
//     const { payment } = project;
//     const provider  = payment?.provider ?? "unknown";
//     const paymentId = payment?.razorpayPaymentId ?? payment?.paypalOrderId;
//     const maxAmount = payment?.finalAmount ?? 0;
//     const currency  = payment?.currency ?? "USD";
//     const symbol    = currencySymbol(currency);
//     const endpoint  = provider === "razorpay"
//       ? `${Url}/api/razorpay/refund-order`
//       : `${Url}/paypal/refund-order`;

//     const result = await Swal.fire({
//       title: "Process Refund?",
//       html: `
//         <div style="text-align:left;padding:10px">
//           <div style="background:#f0f4ff;padding:14px;border-radius:8px;margin-bottom:16px;border-left:4px solid #3b82f6">
//             <p style="margin:4px 0"><strong>Provider:</strong> <span style="text-transform:uppercase;font-weight:700;color:#3b82f6">${provider}</span></p>
//             <p style="margin:4px 0"><strong>Payment ID:</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:3px">${paymentId}</code></p>
//             <p style="margin:12px 0 4px;font-size:17px"><strong>Total:</strong> <span style="color:#d9534f;font-size:22px;font-weight:700">${symbol}${maxAmount.toFixed(2)}</span></p>
//           </div>
//           <label style="font-weight:600;display:block;margin-bottom:6px">Refund Amount (leave empty for full)</label>
//           <input id="refund-amount" class="swal2-input" placeholder="Enter amount" type="number" step="0.01" min="0.01" max="${maxAmount}" style="width:100%;margin:0 0 12px" />
//           <label style="font-weight:600;display:block;margin-bottom:6px">Reason (optional)</label>
//           <textarea id="refund-reason" class="swal2-textarea" placeholder="Refund reason..." style="width:100%;min-height:70px"></textarea>
//         </div>`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Process Refund",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#6c757d",
//       width: "560px",
//       preConfirm: () => {
//         const amount = document.getElementById("refund-amount").value.trim();
//         const reason = document.getElementById("refund-reason").value.trim();
//         if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount)) {
//           Swal.showValidationMessage(`Amount must be between ${symbol}0.01 and ${symbol}${maxAmount.toFixed(2)}`);
//           return false;
//         }
//         return { amount: amount ? parseFloat(amount) : null, reason: reason || "Refund requested by admin" };
//       },
//     });

//     if (!result.isConfirmed) return;

//     try {
//       Swal.fire({
//         title: "Processing...", allowOutsideClick: false, showConfirmButton: false,
//         html: `<div style="text-align:center;padding:20px"><div class="spinner-border text-primary" style="width:3rem;height:3rem"></div><p style="margin-top:12px;color:#666">Please wait...</p></div>`,
//       });

//       const { data } = await axios.post(endpoint,
//         { projectId: project._id, amount: result.value.amount, reason: result.value.reason },
//         { headers: { authorization: localStorage.getItem("token") } }
//       );

//       const refunded = data.amount ?? result.value.amount ?? maxAmount;
//       Swal.fire({
//         icon: "success", title: "Refund Successful!",
//         html: `<div style="background:#d4edda;padding:14px;border-radius:8px;border-left:4px solid #28a745;text-align:left">
//           <p style="margin:4px 0"><strong>Refund ID:</strong> <code>${data.refundId}</code></p>
//           ${data.refundInvoiceNumber ? `<p style="margin:4px 0"><strong>Invoice:</strong> <code>${data.refundInvoiceNumber}</code></p>` : ""}
//           <p style="margin:4px 0"><strong>Amount:</strong> <span style="color:#28a745;font-size:20px;font-weight:700">${symbol}${refunded.toFixed(2)}</span></p>
//           <p style="margin:10px 0 0;font-size:12px;color:#555;text-align:center">Credited within 5–7 business days</p></div>`,
//         confirmButtonColor: "#28a745",
//       });
//       await refetch();
//     } catch (error) {
//       const msg     = error.response?.data?.message ?? "Refund failed";
//       const details = error.response?.data?.details ?? error.response?.data?.error ?? error.message;
//       Swal.fire({
//         icon: "error", title: "Refund Failed",
//         html: `<div style="background:#f8d7da;padding:14px;border-radius:8px;border-left:4px solid #d9534f;text-align:left">
//           <p style="font-weight:700;color:#721c24;margin:0 0 8px">${msg}</p>
//           ${details ? `<code style="font-size:12px;color:#555">${details}</code>` : ""}</div>`,
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   if (loading) return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//       <CircularProgress size={48} />
//     </Box>
//   );

//   const pay = project?.payment;

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Project View — {projectId}</title></Helmet>
//       <div style={styles.pageWrapper}>

//         {/* ── Page Header ── */}
//         <div style={styles.pageHeader}>
//           <div>
//             <p style={styles.breadcrumb}>
//               <Link to="/dashboard/app" style={styles.breadcrumbLink}>Dashboard</Link>
//               {" / "}
//               <Link to="/dashboard/complete-project" style={styles.breadcrumbLink}>Projects</Link>
//               {" / View"}
//             </p>
//             <h1 style={styles.pageTitle}>Project Details</h1>
//           </div>
//           <Chip
//             label={statusCfg.label}
//             color={statusCfg.color}
//             sx={{ fontWeight: 700, fontSize: 13, px: 1.5, py: 2.5, textTransform: "uppercase", letterSpacing: 1 }}
//           />
//         </div>

//         {/* ── Overview ── */}
//         <Card icon="📁" title="Project Overview">
//           <div style={styles.overviewGrid}>
//             {[
//               { label: "Project ID",  value: <code style={styles.code}>{project?._id}</code> },
//               { label: "Client",      value: <span style={{ textTransform: "capitalize" }}>{project?.clientName}</span> },
//               { label: "Package",     value: packageName },
//               { label: "Total Price", value: `$${project?.totalPrice}`, accent: true },
//             ].map(({ label, value, accent }) => (
//               <div key={label} style={styles.overviewCell}>
//                 <span style={styles.overviewLabel}>{label}</span>
//                 <span style={{ ...styles.overviewValue, ...(accent ? { color: "#2e7d32", fontSize: 22, fontWeight: 700 } : {}) }}>
//                   {value}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* ── Services ── */}
//         {project?.service?.length > 0 && (
//           <Card icon="⚙️" title="Services">
//             <div style={{ overflowX: "auto" }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr style={styles.theadRow}>
//                     {["Service", "Duration", "Price", "Status", ""].map((h) => (
//                       <th key={h} style={styles.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project.service.map((svc, idx) => (
//                     <tr key={idx} style={styles.tbodyRow}>
//                       <td style={{ ...styles.td, fontWeight: 600, textTransform: "capitalize" }}>
//                         {svc.serviceName || svc.serviceTitle || "—"}
//                       </td>
//                       <td style={{ ...styles.td, fontSize: 13, color: "#666" }}>
//                         {svc.serviceStart ? `${formatDateStr(svc.serviceStart)} – ${formatDateStr(svc.serviceEnd)}` : "—"}
//                       </td>
//                       <td style={{ ...styles.td, fontWeight: 700, color: "#2e7d32" }}>${svc.price}</td>
//                       <td style={styles.td}>
//                         <Chip
//                           label={project.projectStatus}
//                           color={statusCfg.color}
//                           size="small"
//                           sx={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}
//                         />
//                       </td>
//                       {/* ── Button sirf tab dikhega jab serviceId comboservices mein confirm ho ── */}
//                       <td style={styles.td}>
//                         {svc.serviceId && comboServiceIds[svc.serviceId] === true && (
//                           <Button
//                             variant="contained"
//                             size="small"
//                             onClick={() => handleShowAllServices(svc.serviceId)}
//                             sx={{
//                               backgroundColor: "#1976d2",
//                               "&:hover": { backgroundColor: "#1565c0" },
//                               textTransform: "none",
//                               fontSize: 12,
//                               borderRadius: 5,
//                               px: 2,
//                               whiteSpace: "nowrap",
//                             }}
//                           >
//                             show all services
//                           </Button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         )}

//         {/* ── Payment Details ── */}
//         {pay && (
//           <Card
//             icon="💳"
//             title="Payment Details"
//             action={pay.provider && (
//               <Chip
//                 label={pay.provider === "razorpay" ? "💳 Razorpay" : "🅿️ PayPal"}
//                 variant="outlined"
//                 size="small"
//                 sx={{ fontWeight: 700, fontSize: 12 }}
//               />
//             )}
//           >
//             <div style={{ padding: "12px 20px", background: pay.status === "completed" ? "#f0fff4" : pay.status === "refunded" ? "#fff5f5" : "#fffbeb", borderBottom: "1px solid #f0f0f0" }}>
//               <InfoRow
//                 label="Payment Status"
//                 value={<Chip label={pay.status?.toUpperCase()} size="small"
//                   color={pay.status === "completed" ? "success" : pay.status === "refunded" ? "error" : "warning"}
//                   sx={{ fontWeight: 700 }} />}
//               />
//             </div>

//             <div style={styles.infoGrid}>
//               {pay.invoiceNumber && <InfoRow label="Invoice Number" value={pay.invoiceNumber} />}
//               {pay.invoiceDate   && <InfoRow label="Invoice Date"   value={pay.invoiceDate} />}
//               <InfoRow label="Transaction ID"
//                 value={<code style={styles.code}>{pay.transactionId ?? "—"}</code>} />
//               <InfoRow
//                 label={pay.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
//                 value={<code style={styles.code}>{pay.razorpayOrderId ?? pay.paypalOrderId ?? "—"}</code>}
//               />
//               <InfoRow label="Provider"   value={<span style={{ textTransform: "capitalize" }}>{pay.provider ?? "—"}</span>} />
//               <InfoRow label="Currency"   value={<Chip label={pay.currency ?? "USD"} size="small" color="info" sx={{ fontWeight: 700 }} />} />
//               <InfoRow label="Subtotal"   value={fmtAmount(pay.currency, pay.subtotal)} />
//               {pay.discountAmount > 0 && <InfoRow label="Discount" value={`-${fmtAmount(pay.currency, pay.discountAmount)}`} />}
//               {pay.couponCode && <InfoRow label="Coupon" value={<Chip label={pay.couponCode} size="small" color="success" />} />}
//               {pay.conversionRate   && <InfoRow label="Conversion Rate"  value={`$1 = ₹${pay.conversionRate.toFixed(2)}`} />}
//               {pay.finalAmountUSD   && <InfoRow label="Amount in USD"    value={`$${pay.finalAmountUSD.toFixed(2)}`} />}
//               {pay.paidAt           && <InfoRow label="Paid At"          value={formatDateTime(pay.paidAt)} />}
//             </div>

//             <div style={styles.finalAmountRow}>
//               <span style={styles.finalAmountLabel}>Final Amount</span>
//               <span style={styles.finalAmountValue}>{fmtAmount(pay.currency, pay.finalAmount)}</span>
//             </div>

//             {pay.taxBreakdown && (
//               <>
//                 <SectionDivider label="Tax Breakdown" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Subtotal (Before Tax)" value={`₹${pay.taxBreakdown.subtotal?.toFixed(2) ?? "0.00"}`} />
//                   {pay.taxBreakdown.isDelhi ? (
//                     <>
//                       <InfoRow label="CGST @ 9%" value={`₹${pay.taxBreakdown.cgst?.toFixed(2) ?? "0.00"}`} />
//                       <InfoRow label="SGST @ 9%" value={`₹${pay.taxBreakdown.sgst?.toFixed(2) ?? "0.00"}`} />
//                     </>
//                   ) : (
//                     <InfoRow label="IGST @ 18%" value={`₹${pay.taxBreakdown.igst?.toFixed(2) ?? "0.00"}`} />
//                   )}
//                   <InfoRow label="Total Tax" value={`₹${pay.taxBreakdown.totalTax?.toFixed(2) ?? "0.00"}`} />
//                 </div>
//               </>
//             )}

//             {(pay.companyName || pay.gstNumber) && (
//               <>
//                 <SectionDivider label="Business Details" />
//                 <div style={styles.infoGrid}>
//                   {pay.companyName  && <InfoRow label="Company"        value={pay.companyName} />}
//                   {pay.gstNumber    && <InfoRow label="GST Number"     value={pay.gstNumber} />}
//                   {pay.gstStateCode && <InfoRow label="GST State Code" value={pay.gstStateCode} />}
//                 </div>
//               </>
//             )}

//             {pay.clientAddress && (
//               <>
//                 <SectionDivider label="Billing Address" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Address"  value={pay.clientAddress} />
//                   <InfoRow label="City"     value={pay.clientCity} />
//                   <InfoRow label="State"    value={pay.clientState} />
//                   <InfoRow label="Pincode"  value={pay.clientPincode} />
//                   <InfoRow label="Country"  value={pay.clientCountry} />
//                 </div>
//               </>
//             )}

//             {pay.payer && (
//               <>
//                 <SectionDivider label="Payer Information" />
//                 <div style={styles.infoGrid}>
//                   <InfoRow label="Name"     value={pay.payer.name} />
//                   <InfoRow label="Email"    value={pay.payer.email} />
//                   <InfoRow label="Payer ID" value={pay.payer.payerId} />
//                   <InfoRow label="Country"  value={pay.payer.country?.toUpperCase()} />
//                 </div>
//               </>
//             )}

//             {pay.dispute && (
//               <div style={{ padding: "12px 20px", background: pay.dispute.isDisputed ? "#fff5f5" : "#f0fff4", borderTop: "1px solid #f0f0f0" }}>
//                 <InfoRow label="Dispute Status"
//                   value={pay.dispute.isDisputed ? "⚠️ Payment Disputed" : "✓ No Disputes"} />
//               </div>
//             )}

//             {(pay.invoicePdfUrl || pay.refund?.refundInvoicePdfUrl) && (
//               <div style={styles.invoiceDownload}>
//                 <p style={styles.sectionDividerLabel}>📄 Download Invoices</p>
//                 <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
//                   {pay.invoicePdfUrl && (
//                     <a href={pay.invoicePdfUrl} target="_blank" rel="noopener noreferrer" style={styles.downloadBtn("#198754")}>
//                       ⬇ Purchase Invoice ({pay.invoiceNumber})
//                     </a>
//                   )}
//                   {pay.refund?.refundInvoicePdfUrl && (
//                     <a href={pay.refund.refundInvoicePdfUrl} target="_blank" rel="noopener noreferrer" style={styles.downloadBtn("#dc3545")}>
//                       ↩ Refund Invoice ({pay.refund.refundInvoiceNumber})
//                     </a>
//                   )}
//                 </div>
//               </div>
//             )}

//             {pay.status === "completed" && !pay.refund?.isRefunded && (
//               <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0" }}>
//                 <Button variant="contained" color="error" fullWidth onClick={handleRefundClick}
//                   sx={{ py: 1.5, fontWeight: 700, fontSize: 14, textTransform: "none", borderRadius: 2 }}>
//                   ↩ Process Refund via {pay.provider === "razorpay" ? "Razorpay" : "PayPal"}
//                 </Button>
//               </div>
//             )}

//             {pay.refund?.isRefunded && (
//               <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0" }}>
//                 <div style={styles.refundAlert}>
//                   <p style={{ fontWeight: 700, color: "#155724", marginBottom: 10 }}>
//                     ✅ Refund Processed Successfully
//                   </p>
//                   <div style={styles.infoGrid}>
//                     <InfoRow label="Refund Amount" value={fmtAmount(pay.currency, pay.refund.refundAmount)} accent />
//                     <InfoRow label="Status"    value={<Chip label={pay.refund.refundStatus} size="small" color="success" sx={{ fontWeight: 700, textTransform: "uppercase" }} />} />
//                     <InfoRow label="Refund ID" value={<code style={styles.code}>{pay.refund.refundId}</code>} />
//                     {pay.refund.refundInvoiceNumber && <InfoRow label="Refund Invoice" value={<code style={styles.code}>{pay.refund.refundInvoiceNumber}</code>} />}
//                     <InfoRow label="Refunded At" value={formatDateTime(pay.refund.refundedAt)} />
//                     {pay.refund.refundReason && <InfoRow label="Reason" value={pay.refund.refundReason} />}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {pay.history?.length > 0 && (
//               <>
//                 <SectionDivider label="Payment History" />
//                 <div style={{ padding: "0 0 8px", overflowX: "auto" }}>
//                   <table style={styles.table}>
//                     <thead>
//                       <tr style={styles.theadRow}>
//                         {["Action", "Amount", "Transaction ID", "Reason", "Timestamp", "By"].map((h) => (
//                           <th key={h} style={styles.th}>{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {pay.history.map((event, idx) => (
//                         <tr key={idx} style={styles.tbodyRow}>
//                           <td style={styles.td}>
//                             <Chip label={event.action.toUpperCase()} size="small"
//                               color={event.status === "completed" ? "success" : event.status === "refunded" ? "error" : "warning"}
//                               sx={{ fontSize: 10, fontWeight: 700 }} />
//                           </td>
//                           <td style={{ ...styles.td, fontWeight: 600 }}>{fmtAmount(pay.currency, event.amount)}</td>
//                           <td style={styles.td}><code style={styles.code}>{event.transactionId}</code></td>
//                           <td style={styles.td}>{event.reason ?? "—"}</td>
//                           <td style={{ ...styles.td, fontSize: 12, whiteSpace: "nowrap" }}>{formatDateTime(event.timestamp)}</td>
//                           <td style={styles.td}><Chip label={event.performedBy} size="small" variant="outlined" sx={{ fontSize: 11 }} /></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </Card>
//         )}

//         {/* ── Team ── */}
//         {project?.team && (
//           <Card
//             icon="👥"
//             title="Team Members"
//             action={
//               <Link to={`/dashboard/edit-team/${project.team._id}`} style={styles.editBtn}>
//                 ✏️ Edit Team
//               </Link>
//             }
//           >
//             <div style={{ overflowX: "auto" }}>
//               <table style={styles.table}>
//                 <thead>
//                   <tr style={styles.theadRow}>
//                     {["Role", "Name", "Source", "Rating"].map((h) => (
//                       <th key={h} style={styles.th}>{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr style={styles.tbodyRow}>
//                     <td style={{ ...styles.td, fontWeight: 600 }}>{project.team.assistant?.role ?? "—"}</td>
//                     <td style={styles.td}>{project.team.assistant?.staffName ?? "—"}</td>
//                     <td style={styles.td}>
//                       <Chip label={project.team.assistant?.source ?? "Internal"} size="small" variant="outlined" sx={{ fontSize: 11 }} />
//                     </td>
//                     <td style={{ ...styles.td, textAlign: "center" }}>
//                       {assistantRating ? (
//                         <Rating count={5} value={assistantRating.ratingStar} size={18} edit={false} activeColor="#ffa500" />
//                       ) : (
//                         <Button variant="contained" size="small" onClick={() => setOpenModal(true)}
//                           sx={{ backgroundColor: "#ff9800", "&:hover": { backgroundColor: "#f57c00" }, textTransform: "none", fontSize: 12, borderRadius: 5, px: 2 }}>
//                           ⭐ Rate
//                         </Button>
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </Card>
//         )}
//       </div>

//       {/* ── Rating Modal ── */}
//       <RatingModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSubmit={handleSubmitRating}
//         loading={ratingLoading}
//       />

//       {/* ── Combo Services Modal ── */}
//       <ComboServicesModal
//         open={comboModal}
//         onClose={() => { setComboModal(false); setComboData(null); }}
//         loading={comboLoading}
//         comboData={comboData}
//       />
//     </>
//   );
// };

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = {
//   pageWrapper: {
//     maxWidth: 960,
//     margin: "0 auto",
//     padding: "24px 16px 48px",
//     display: "flex",
//     flexDirection: "column",
//     gap: 20,
//   },
//   pageHeader: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: 12,
//     marginBottom: 8,
//   },
//   breadcrumb: { margin: "0 0 4px", fontSize: 13, color: "#888" },
//   breadcrumbLink: { color: "#1976d2", textDecoration: "none" },
//   pageTitle: { margin: 0, fontSize: 26, fontWeight: 800, color: "#1a1a2e", letterSpacing: -0.5 },

//   card: {
//     background: "#fff",
//     borderRadius: 12,
//     border: "1px solid #eef0f4",
//     boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//     overflow: "hidden",
//   },
//   cardHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "14px 20px",
//     background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
//     borderBottom: "1px solid #eef0f4",
//   },
//   cardIcon:  { fontSize: 18 },
//   cardTitle: { margin: 0, fontSize: 15, fontWeight: 700, color: "#fff" },

//   overviewGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//     gap: 0,
//   },
//   overviewCell: {
//     display: "flex",
//     flexDirection: "column",
//     padding: "16px 20px",
//     borderRight: "1px solid #f0f0f0",
//     borderBottom: "1px solid #f0f0f0",
//   },
//   overviewLabel: { fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 },
//   overviewValue: { fontSize: 15, fontWeight: 600, color: "#1a1a2e" },

//   infoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" },
//   infoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     borderBottom: "1px solid #f8f9fa",
//     gap: 12,
//   },
//   infoLabel: { fontSize: 13, color: "#777", fontWeight: 500, minWidth: 130 },
//   infoValue: { fontSize: 14, color: "#1a1a2e", fontWeight: 500, textAlign: "right" },

//   sectionDivider: {
//     background: "#f8f9fa",
//     padding: "8px 20px",
//     borderTop: "1px solid #eef0f4",
//     borderBottom: "1px solid #eef0f4",
//   },
//   sectionDividerLabel: { fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 1 },

//   finalAmountRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "16px 20px",
//     background: "linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)",
//     borderTop: "2px solid #c8e6c9",
//     borderBottom: "1px solid #c8e6c9",
//   },
//   finalAmountLabel: { fontSize: 16, fontWeight: 700, color: "#1a1a2e" },
//   finalAmountValue: { fontSize: 28, fontWeight: 800, color: "#2e7d32" },

//   invoiceDownload: {
//     padding: "14px 20px",
//     background: "#f8f9fa",
//     borderTop: "1px solid #f0f0f0",
//   },
//   downloadBtn: (bg) => ({
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 6,
//     padding: "9px 18px",
//     background: bg,
//     color: "#fff",
//     borderRadius: 8,
//     textDecoration: "none",
//     fontSize: 13,
//     fontWeight: 600,
//   }),

//   refundAlert: {
//     background: "#f0fff4",
//     border: "1px solid #c3e6cb",
//     borderRadius: 8,
//     padding: "14px 16px",
//   },

//   table: { width: "100%", borderCollapse: "collapse" },
//   theadRow: { background: "#f8f9fa" },
//   th: { padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: 0.6, borderBottom: "2px solid #eef0f4" },
//   tbodyRow: { borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" },
//   td: { padding: "11px 16px", fontSize: 14, color: "#333" },

//   code: { background: "#f0f4ff", padding: "2px 7px", borderRadius: 4, fontFamily: "monospace", fontSize: 12, color: "#3b4a6b" },

//   editBtn: {
//     display: "inline-block",
//     padding: "6px 14px",
//     background: "#1976d2",
//     color: "#fff",
//     borderRadius: 6,
//     textDecoration: "none",
//     fontSize: 13,
//     fontWeight: 600,
//   },

//   modal: {
//     width: 420,
//     bgcolor: "background.paper",
//     boxShadow: 24,
//     p: 4,
//     borderRadius: 3,
//     mx: "auto",
//     mt: "10vh",
//     position: "relative",
//     outline: "none",
//   },
//   modalClose: {
//     position: "absolute",
//     top: 12,
//     right: 14,
//     background: "none",
//     border: "none",
//     fontSize: 24,
//     cursor: "pointer",
//     color: "#555",
//     lineHeight: 1,
//     padding: 0,
//   },
// };

// export default ProjectViewPage;
















import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Modal, Box, Button, TextField, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Rating from "react-rating-stars-component";
import axios from "axios";
import { Url } from "src/url/url";
import { projectdata } from "src/redux/slice/project";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDateStr = (dateString) => {
  if (!dateString) return "—";
  const [year, month, day] = dateString.split("-");
  return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" })
    .format(new Date(year, month - 1, day));
};

const formatDateTime = (dateInput) => {
  if (!dateInput) return "—";
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(dateInput));
};

const currencySymbol = (currency) => currency === "INR" ? "₹" : "$";
const fmtAmount = (currency, amount) => `${currencySymbol(currency)}${(amount ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const STATUS_CONFIG = {
  completed:          { bg: "#dcfce7", color: "#15803d", label: "Completed" },
  running:            { bg: "#dbeafe", color: "#1d4ed8", label: "Running" },
  refunded:           { bg: "#fee2e2", color: "#b91c1c", label: "Refunded" },
  partially_refunded: { bg: "#fef9c3", color: "#b45309", label: "Partial Refund" },
  new:                { bg: "#fef9c3", color: "#b45309", label: "New" },
  pending:            { bg: "#fef9c3", color: "#b45309", label: "Pending" },
};

// ─── Tiny Reusable Components ─────────────────────────────────────────────────

const StatusBadge = ({ status, label, size = "md" }) => {
  const cfg = STATUS_CONFIG[status] ?? { bg: "#f3f4f6", color: "#374151", label: status };
  const text = label ?? cfg.label;
  const fontSize = size === "sm" ? 10 : 12;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: size === "sm" ? "2px 9px" : "4px 12px",
      borderRadius: 999, fontSize, fontWeight: 600,
      background: cfg.bg, color: cfg.color,
      letterSpacing: 0.4, textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>
      {text}
    </span>
  );
};

const Card = ({ icon, title, action, children, noPad = true }) => (
  <div style={S.card}>
    <div style={S.cardHead}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={S.cardIcon}>{icon}</span>
        <span style={S.cardTitle}>{title}</span>
      </div>
      {action}
    </div>
    <div>{children}</div>
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={S.sectionLabel}>{children}</div>
);

const DataRow = ({ label, value, accent }) => (
  <div style={S.dataRow}>
    <span style={S.dataLabel}>{label}</span>
    <span style={{ ...S.dataValue, ...(accent ? { color: "#15803d", fontSize: 15, fontWeight: 700 } : {}) }}>
      {value}
    </span>
  </div>
);

const CodeChip = ({ children }) => (
  <code style={S.codeChip}>{children}</code>
);

// ─── Rating Modal ─────────────────────────────────────────────────────────────
const RatingModal = ({ open, onClose, onSubmit, loading }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [feedback, setFeedback]       = useState("");

  const handleSubmit = () => {
    onSubmit(ratingValue, feedback);
    setRatingValue(0);
    setFeedback("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        width: 400, bgcolor: "background.paper", boxShadow: 24,
        borderRadius: 3, mx: "auto", mt: "12vh", p: 4,
        outline: "none", position: "relative",
      }}>
        <button onClick={onClose} style={S.modalClose}>&times;</button>
        <p style={{ fontSize: 16, fontWeight: 700, textAlign: "center", marginBottom: 20, color: "#111" }}>
          Rate Assistant
        </p>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Rating count={5} value={ratingValue} onChange={setRatingValue} size={36} activeColor="#f59e0b" />
        </div>
        <TextField
          fullWidth multiline minRows={3}
          label="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ mb: 2.5 }}
        />
        <Button fullWidth variant="contained" onClick={handleSubmit} disabled={loading}
          sx={{ py: 1.4, fontWeight: 600, borderRadius: 2, textTransform: "none" }}>
          {loading ? <CircularProgress size={18} color="inherit" /> : "Submit Feedback"}
        </Button>
      </Box>
    </Modal>
  );
};

// ─── Combo Services Modal ─────────────────────────────────────────────────────
const ComboServicesModal = ({ open, onClose, loading, comboData }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={{
      width: { xs: "92%", sm: 540 },
      bgcolor: "background.paper",
      boxShadow: 24, borderRadius: 3,
      mx: "auto", mt: "8vh",
      outline: "none", maxHeight: "82vh", overflowY: "auto",
    }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>All Services in this Combo</span>
        <button onClick={onClose} style={S.modalClose2}>&times;</button>
      </div>

      {comboData && !loading && (
        <div style={{ padding: "14px 20px", background: "#f8faff", borderBottom: "1px solid #e8edf5", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <p style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 3 }}>Combo Name</p>
            <p style={{ fontWeight: 700, fontSize: 15, textTransform: "capitalize" }}>{comboData.comboName}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 3 }}>Combo Price</p>
            <p style={{ fontWeight: 800, fontSize: 20, color: "#15803d" }}>₹{comboData.comboPrice}</p>
          </div>
          {comboData.discountPercentage > 0 && (
            <span style={{ ...S.successBadge, fontSize: 11 }}>{comboData.discountPercentage}% Discount Applied</span>
          )}
        </div>
      )}

      <div style={{ padding: 20 }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
            <CircularProgress />
          </div>
        ) : !comboData?.services?.length ? (
          <p style={{ textAlign: "center", color: "#888", padding: "28px 0" }}>No services found.</p>
        ) : (
          <table style={S.table}>
            <thead>
              <tr style={S.thead}>
                <th style={S.th}>#</th>
                <th style={S.th}>Service Name</th>
                <th style={S.th}>Original Price</th>
              </tr>
            </thead>
            <tbody>
              {comboData.services.map((s, idx) => (
                <tr key={idx} style={S.tbodyRow}>
                  <td style={{ ...S.td, color: "#aaa", fontSize: 12 }}>{idx + 1}</td>
                  <td style={{ ...S.td, fontWeight: 600, textTransform: "capitalize" }}>{s.serviceName}</td>
                  <td style={{ ...S.td, fontWeight: 700, color: "#15803d" }}>₹{s.originalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Box>
  </Modal>
);

// ─── Custom Hook ──────────────────────────────────────────────────────────────
const useProject = (projectId) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    try {
      const { data } = await axios.get(`${Url}/project/singleProjectWithTeam/${projectId}`);
      setProject(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => { fetchProject(); }, [fetchProject]);
  return { project, loading, refetch: fetchProject };
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProjectViewPage = () => {
  const { projectId }  = useParams();
  const packageAllData = useSelector((s) => s.package.data);
  const ratingAllData  = useSelector((s) => s.rating.data);
  const dispatch       = useDispatch();

  const [openModal, setOpenModal]         = useState(false);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [comboModal, setComboModal]       = useState(false);
  const [comboLoading, setComboLoading]   = useState(false);
  const [comboData, setComboData]         = useState(null);
  const [comboServiceIds, setComboServiceIds] = useState({});

  const { project, loading, refetch } = useProject(projectId);

  useEffect(() => {
    if (!project?.service?.length) return;
    const serviceIds = project.service.map(s => s.serviceId).filter(Boolean);
    if (!serviceIds.length) return;
    const checkCombos = async () => {
      const results = {};
      await Promise.all(
        serviceIds.map(async (id) => {
          try {
            await axios.get(`${Url}/api/combo/combo-service/${id}`);
            results[id] = true;
          } catch {
            results[id] = false;
          }
        })
      );
      setComboServiceIds(results);
    };
    checkCombos();
  }, [project]);

  const assistantRating = useMemo(() =>
    ratingAllData?.find(
      (r) => r.projectId === project?._id && r.employ === project?.team?.assistant?.staffId
    ), [ratingAllData, project]);

  const packageName = useMemo(() => {
    if (project?.projectType !== "package") return "Custom Package";
    return packageAllData?.find((p) => p._id === project.packageId)?.packageName ?? "—";
  }, [project, packageAllData]);

  const statusCfg = STATUS_CONFIG[project?.projectStatus] ?? { bg: "#f3f4f6", color: "#374151", label: project?.projectStatus };

  const handleShowAllServices = async (serviceId) => {
    if (!serviceId) return;
    setComboData(null);
    setComboModal(true);
    setComboLoading(true);
    try {
      const { data } = await axios.get(`${Url}/api/combo/combo-service/${serviceId}`);
      setComboData(data);
    } catch (err) {
      console.error(err);
      setComboData(null);
    } finally {
      setComboLoading(false);
    }
  };

  const handleSubmitRating = async (ratingValue, feedback) => {
    if (!ratingValue) return Swal.fire("Warning", "Please select a rating.", "warning");
    setRatingLoading(true);
    try {
      await axios.post(`${Url}/rating/add-assistant-rating`, {
        projectId: project?._id,
        teamId: project?.team?._id,
        employ: project?.team?.assistant?.staffId,
        clientId: project?.clientId?._id || project?.clientId,
        clientName: project?.clientName,
        ratingStar: ratingValue,
        ratingComment: feedback,
      });
      Swal.fire("Success", "Rating submitted successfully!", "success");
      setOpenModal(false);
      dispatch(projectdata());
    } catch {
      Swal.fire("Error", "Something went wrong while submitting rating.", "error");
    } finally {
      setRatingLoading(false);
    }
  };

  const handleRefundClick = async () => {
    const { payment } = project;
    const provider  = payment?.provider ?? "unknown";
    const paymentId = payment?.razorpayPaymentId ?? payment?.paypalOrderId;
    const maxAmount = payment?.finalAmount ?? 0;
    const currency  = payment?.currency ?? "USD";
    const symbol    = currencySymbol(currency);
    const endpoint  = provider === "razorpay"
      ? `${Url}/api/razorpay/refund-order`
      : `${Url}/paypal/refund-order`;

    const result = await Swal.fire({
      title: "Process Refund?",
      html: `
        <div style="text-align:left;padding:10px">
          <div style="background:#f0f4ff;padding:14px;border-radius:8px;margin-bottom:16px;border-left:4px solid #3b82f6">
            <p style="margin:4px 0"><strong>Provider:</strong> <span style="text-transform:uppercase;font-weight:700;color:#3b82f6">${provider}</span></p>
            <p style="margin:4px 0"><strong>Payment ID:</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:3px">${paymentId}</code></p>
            <p style="margin:12px 0 4px;font-size:17px"><strong>Total:</strong> <span style="color:#d9534f;font-size:22px;font-weight:700">${symbol}${maxAmount.toFixed(2)}</span></p>
          </div>
          <label style="font-weight:600;display:block;margin-bottom:6px">Refund Amount (leave empty for full)</label>
          <input id="refund-amount" class="swal2-input" placeholder="Enter amount" type="number" step="0.01" min="0.01" max="${maxAmount}" style="width:100%;margin:0 0 12px" />
          <label style="font-weight:600;display:block;margin-bottom:6px">Reason (optional)</label>
          <textarea id="refund-reason" class="swal2-textarea" placeholder="Refund reason..." style="width:100%;min-height:70px"></textarea>
        </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Process Refund",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      width: "560px",
      preConfirm: () => {
        const amount = document.getElementById("refund-amount").value.trim();
        const reason = document.getElementById("refund-reason").value.trim();
        if (amount && (parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount)) {
          Swal.showValidationMessage(`Amount must be between ${symbol}0.01 and ${symbol}${maxAmount.toFixed(2)}`);
          return false;
        }
        return { amount: amount ? parseFloat(amount) : null, reason: reason || "Refund requested by admin" };
      },
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Processing...", allowOutsideClick: false, showConfirmButton: false,
        html: `<div style="text-align:center;padding:20px"><p style="margin-top:12px;color:#666">Please wait...</p></div>`,
      });

      const { data } = await axios.post(endpoint,
        { projectId: project._id, amount: result.value.amount, reason: result.value.reason },
        { headers: { authorization: localStorage.getItem("token") } }
      );

      const refunded = data.amount ?? result.value.amount ?? maxAmount;
      Swal.fire({
        icon: "success", title: "Refund Successful!",
        html: `<div style="background:#d4edda;padding:14px;border-radius:8px;border-left:4px solid #28a745;text-align:left">
          <p style="margin:4px 0"><strong>Refund ID:</strong> <code>${data.refundId}</code></p>
          ${data.refundInvoiceNumber ? `<p style="margin:4px 0"><strong>Invoice:</strong> <code>${data.refundInvoiceNumber}</code></p>` : ""}
          <p style="margin:4px 0"><strong>Amount:</strong> <span style="color:#28a745;font-size:20px;font-weight:700">${symbol}${refunded.toFixed(2)}</span></p>
        </div>`,
        confirmButtonColor: "#28a745",
      });
      await refetch();
    } catch (error) {
      const msg     = error.response?.data?.message ?? "Refund failed";
      const details = error.response?.data?.details ?? error.response?.data?.error ?? error.message;
      Swal.fire({
        icon: "error", title: "Refund Failed",
        html: `<div style="background:#f8d7da;padding:14px;border-radius:8px;border-left:4px solid #d9534f;text-align:left">
          <p style="font-weight:700;color:#721c24;margin:0 0 8px">${msg}</p>
          ${details ? `<code style="font-size:12px;color:#555">${details}</code>` : ""}
        </div>`,
        confirmButtonColor: "#d33",
      });
    }
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <CircularProgress size={44} />
    </div>
  );

  const pay = project?.payment;

  return (
    <>
      <ToastContainer />
      <Helmet><title>Project View — {projectId}</title></Helmet>

      <div style={S.page}>

        {/* ── Page Header ── */}
        <div style={S.pageHeader}>
          <div>
            <p style={S.breadcrumb}>
              <Link to="/dashboard/app" style={S.breadLink}>Dashboard</Link>
              {" / "}
              <Link to="/dashboard/complete-project" style={S.breadLink}>Projects</Link>
              {" / View"}
            </p>
            <h1 style={S.pageTitle}>Project Details</h1>
          </div>
          <StatusBadge status={project?.projectStatus} />
        </div>

        {/* ── Overview ── */}
        <Card icon="📁" title="Project Overview">
          <div style={S.metricGrid}>
            {[
              { label: "Project ID",  value: <CodeChip>{project?._id}</CodeChip> },
              { label: "Client",      value: project?.clientName },
              { label: "Package",     value: packageName },
              { label: "Total Price", value: `$${project?.totalPrice}`, accent: true },
            ].map(({ label, value, accent }) => (
              <div key={label} style={S.metricCell}>
                <span style={S.metricLabel}>{label}</span>
                <span style={{ ...S.metricValue, ...(accent ? { fontSize: 20, color: "#15803d", fontWeight: 700 } : {}) }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Services ── */}
        {project?.service?.length > 0 && (
          <Card icon="⚙️" title="Services">
            <div style={{ overflowX: "auto" }}>
              <table style={S.table}>
                <thead>
                  <tr style={S.thead}>
                    {["Service", "Duration", "Price", "Status", ""].map((h) => (
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {project.service.map((svc, idx) => (
                    <tr key={idx} style={S.tbodyRow}>
                      <td style={{ ...S.td, fontWeight: 600, textTransform: "capitalize" }}>
                        {svc.serviceName || svc.serviceTitle || "—"}
                      </td>
                      <td style={{ ...S.td, color: "#888", fontSize: 12 }}>
                        {svc.serviceStart
                          ? `${formatDateStr(svc.serviceStart)} – ${formatDateStr(svc.serviceEnd)}`
                          : "—"}
                      </td>
                      <td style={{ ...S.td, fontWeight: 600, color: "#15803d" }}>${svc.price}</td>
                      <td style={S.td}>
                        <StatusBadge status={project.projectStatus} size="sm" />
                      </td>
                      <td style={S.td}>
                        {svc.serviceId && comboServiceIds[svc.serviceId] === true && (
                          <button
                            onClick={() => handleShowAllServices(svc.serviceId)}
                            style={S.comboBtn}
                          >
                            show all services
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* ── Payment Details ── */}
        {pay && (
          <Card
            icon="💳"
            title="Payment Details"
            action={
              pay.provider && (
                <span style={{ ...S.providerChip, background: pay.provider === "razorpay" ? "#e0f2fe" : "#fdf4ff", color: pay.provider === "razorpay" ? "#0369a1" : "#7e22ce" }}>
                  {pay.provider === "razorpay" ? "Razorpay" : "PayPal"}
                </span>
              )
            }
          >
            {/* Payment Status */}
            <div style={{
              padding: "10px 18px",
              background: pay.status === "completed" ? "#f0fdf4" : pay.status === "refunded" ? "#fef2f2" : "#fefce8",
              borderBottom: "1px solid #f0f0f0",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 13, color: "#555" }}>Payment Status</span>
              <StatusBadge status={pay.status} label={pay.status?.toUpperCase()} />
            </div>

            {/* Transaction Info */}
            <SectionLabel>Transaction Info</SectionLabel>
            <div style={S.dataGrid}>
              {pay.invoiceNumber && <DataRow label="Invoice Number" value={pay.invoiceNumber} />}
              {pay.invoiceDate   && <DataRow label="Invoice Date"   value={pay.invoiceDate} />}
              <DataRow label="Transaction ID"   value={<CodeChip>{pay.transactionId ?? "—"}</CodeChip>} />
              <DataRow
                label={pay.provider === "razorpay" ? "Razorpay Order ID" : "PayPal Order ID"}
                value={<CodeChip>{pay.razorpayOrderId ?? pay.paypalOrderId ?? "—"}</CodeChip>}
              />
              <DataRow label="Provider"  value={<span style={{ textTransform: "capitalize" }}>{pay.provider ?? "—"}</span>} />
              <DataRow label="Currency"  value={<span style={S.infoBadge}>{pay.currency ?? "USD"}</span>} />
              <DataRow label="Subtotal"  value={fmtAmount(pay.currency, pay.subtotal)} />
              {pay.discountAmount > 0 && <DataRow label="Discount" value={`-${fmtAmount(pay.currency, pay.discountAmount)}`} />}
              {pay.couponCode && <DataRow label="Coupon" value={<span style={S.successBadge}>{pay.couponCode}</span>} />}
              {pay.conversionRate && <DataRow label="Conversion Rate" value={`$1 = ₹${pay.conversionRate.toFixed(2)}`} />}
              {pay.finalAmountUSD && <DataRow label="Amount in USD"   value={`$${pay.finalAmountUSD.toFixed(2)}`} />}
              {pay.paidAt         && <DataRow label="Paid At"         value={formatDateTime(pay.paidAt)} />}
            </div>

            {/* Final Amount */}
            <div style={S.finalAmountRow}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>Final Amount</span>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#15803d" }}>
                {fmtAmount(pay.currency, pay.finalAmount)}
              </span>
            </div>

            {/* Tax Breakdown */}
            {pay.taxBreakdown && (
              <>
                <SectionLabel>Tax Breakdown</SectionLabel>
                <div style={S.dataGrid}>
                  <DataRow label="Subtotal (Before Tax)" value={`₹${pay.taxBreakdown.subtotal?.toFixed(2) ?? "0.00"}`} />
                  {pay.taxBreakdown.isDelhi ? (
                    <>
                      <DataRow label="CGST @ 9%" value={`₹${pay.taxBreakdown.cgst?.toFixed(2) ?? "0.00"}`} />
                      <DataRow label="SGST @ 9%" value={`₹${pay.taxBreakdown.sgst?.toFixed(2) ?? "0.00"}`} />
                    </>
                  ) : (
                    <DataRow label="IGST @ 18%" value={`₹${pay.taxBreakdown.igst?.toFixed(2) ?? "0.00"}`} />
                  )}
                  <DataRow label="Total Tax" value={`₹${pay.taxBreakdown.totalTax?.toFixed(2) ?? "0.00"}`} />
                </div>
              </>
            )}

            {/* Business Details */}
            {(pay.companyName || pay.gstNumber) && (
              <>
                <SectionLabel>Business Details</SectionLabel>
                <div style={S.dataGrid}>
                  {pay.companyName  && <DataRow label="Company"        value={pay.companyName} />}
                  {pay.gstNumber    && <DataRow label="GST Number"     value={pay.gstNumber} />}
                  {pay.gstStateCode && <DataRow label="GST State Code" value={pay.gstStateCode} />}
                </div>
              </>
            )}

            {/* Billing Address */}
            {pay.clientAddress && (
              <>
                <SectionLabel>Billing Address</SectionLabel>
                <div style={S.dataGrid}>
                  <DataRow label="Address" value={pay.clientAddress} />
                  <DataRow label="City"    value={pay.clientCity} />
                  <DataRow label="State"   value={pay.clientState} />
                  <DataRow label="Pincode" value={pay.clientPincode} />
                  <DataRow label="Country" value={pay.clientCountry} />
                </div>
              </>
            )}

            {/* Payer Info */}
            {pay.payer && (
              <>
                <SectionLabel>Payer Information</SectionLabel>
                <div style={S.dataGrid}>
                  <DataRow label="Name"     value={pay.payer.name} />
                  <DataRow label="Email"    value={pay.payer.email} />
                  <DataRow label="Payer ID" value={pay.payer.payerId} />
                  <DataRow label="Country"  value={pay.payer.country?.toUpperCase()} />
                </div>
              </>
            )}

            {/* Dispute */}
            {pay.dispute && (
              <div style={{
                padding: "10px 18px",
                background: pay.dispute.isDisputed ? "#fef2f2" : "#f0fdf4",
                borderTop: "1px solid #f0f0f0",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 13, color: "#555" }}>Dispute Status</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: pay.dispute.isDisputed ? "#b91c1c" : "#15803d" }}>
                  {pay.dispute.isDisputed ? "⚠ Payment Disputed" : "✓ No Disputes"}
                </span>
              </div>
            )}

            {/* Download Invoices */}
            {(pay.invoicePdfUrl || pay.refund?.refundInvoicePdfUrl) && (
              <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f0f0", display: "flex", gap: 10, flexWrap: "wrap" }}>
                {pay.invoicePdfUrl && (
                  <a href={pay.invoicePdfUrl} target="_blank" rel="noopener noreferrer"
                    style={{ ...S.invBtn, background: "#dcfce7", color: "#15803d", borderColor: "#bbf7d0" }}>
                    ⬇ Purchase Invoice ({pay.invoiceNumber})
                  </a>
                )}
                {pay.refund?.refundInvoicePdfUrl && (
                  <a href={pay.refund.refundInvoicePdfUrl} target="_blank" rel="noopener noreferrer"
                    style={{ ...S.invBtn, background: "#fee2e2", color: "#b91c1c", borderColor: "#fecaca" }}>
                    ↩ Refund Invoice ({pay.refund.refundInvoiceNumber})
                  </a>
                )}
              </div>
            )}

            {/* Refund Button */}
            {pay.status === "completed" && !pay.refund?.isRefunded && (
              <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f0f0" }}>
                <button onClick={handleRefundClick} style={S.refundBtn}>
                  ↩ Process Refund via {pay.provider === "razorpay" ? "Razorpay" : "PayPal"}
                </button>
              </div>
            )}

            {/* Refund Info */}
            {pay.refund?.isRefunded && (
              <div style={{ padding: "14px 18px", borderTop: "1px solid #f0f0f0" }}>
                <div style={S.refundBox}>
                  <p style={{ fontWeight: 700, color: "#15803d", marginBottom: 12, fontSize: 14 }}>
                    ✅ Refund Processed Successfully
                  </p>
                  <div style={S.dataGrid}>
                    <DataRow label="Refund Amount" value={fmtAmount(pay.currency, pay.refund.refundAmount)} accent />
                    <DataRow label="Status"        value={<span style={S.successBadge}>{pay.refund.refundStatus}</span>} />
                    <DataRow label="Refund ID"     value={<CodeChip>{pay.refund.refundId}</CodeChip>} />
                    {pay.refund.refundInvoiceNumber && <DataRow label="Refund Invoice" value={<CodeChip>{pay.refund.refundInvoiceNumber}</CodeChip>} />}
                    <DataRow label="Refunded At"   value={formatDateTime(pay.refund.refundedAt)} />
                    {pay.refund.refundReason && <DataRow label="Reason" value={pay.refund.refundReason} />}
                  </div>
                </div>
              </div>
            )}

            {/* Payment History */}
            {pay.history?.length > 0 && (
              <>
                <SectionLabel>Payment History</SectionLabel>
                <div style={{ overflowX: "auto" }}>
                  <table style={S.table}>
                    <thead>
                      <tr style={S.thead}>
                        {["Action", "Amount", "Transaction ID", "Reason", "Timestamp", "By"].map((h) => (
                          <th key={h} style={S.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pay.history.map((event, idx) => {
                        const histStatus = event.action?.toLowerCase() === "captured" ? "completed" : event.status;
                        return (
                          <tr key={idx} style={S.tbodyRow}>
                            <td style={S.td}>
                              <StatusBadge status={histStatus} label={event.action?.toUpperCase()} size="sm" />
                            </td>
                            <td style={{ ...S.td, fontWeight: 600 }}>{fmtAmount(pay.currency, event.amount)}</td>
                            <td style={S.td}><CodeChip>{event.transactionId}</CodeChip></td>
                            <td style={{ ...S.td, color: "#888" }}>{event.reason ?? "—"}</td>
                            <td style={{ ...S.td, fontSize: 12, whiteSpace: "nowrap", color: "#666" }}>
                              {formatDateTime(event.timestamp)}
                            </td>
                            <td style={S.td}>
                              <span style={S.systemChip}>{event.performedBy}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </Card>
        )}

        {/* ── Team ── */}
        {project?.team && (
          <Card
            icon="👥"
            title="Team Members"
            action={
              <Link to={`/dashboard/edit-team/${project.team._id}`} style={S.editBtn}>
                ✏️ Edit Team
              </Link>
            }
          >
            <table style={S.table}>
              <thead>
                <tr style={S.thead}>
                  {["Role", "Name", "Source", "Rating"].map((h) => (
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={S.tbodyRow}>
                  <td style={{ ...S.td, fontWeight: 600 }}>{project.team.assistant?.role ?? "—"}</td>
                  <td style={S.td}>{project.team.assistant?.staffName ?? "—"}</td>
                  <td style={S.td}>
                    <span style={S.systemChip}>{project.team.assistant?.source ?? "Internal"}</span>
                  </td>
                  <td style={{ ...S.td, textAlign: "center" }}>
                    {assistantRating ? (
                      <Rating count={5} value={assistantRating.ratingStar} size={18} edit={false} activeColor="#f59e0b" />
                    ) : (
                      <button
                        onClick={() => setOpenModal(true)}
                        style={{ ...S.comboBtn, background: "#fef9c3", color: "#b45309", borderColor: "#fde68a" }}
                      >
                        ⭐ Rate
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}

      </div>

      <RatingModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitRating}
        loading={ratingLoading}
      />
      <ComboServicesModal
        open={comboModal}
        onClose={() => { setComboModal(false); setComboData(null); }}
        loading={comboLoading}
        comboData={comboData}
      />
    </>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    maxWidth: 940,
    margin: "0 auto",
    padding: "24px 16px 48px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  pageHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 4,
  },
  breadcrumb: { margin: "0 0 4px", fontSize: 12, color: "#888" },
  breadLink:  { color: "#2563eb", textDecoration: "none" },
  pageTitle:  { margin: 0, fontSize: 24, fontWeight: 700, color: "#111" },

  card: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #eef0f4",
    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  cardHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 18px",
    borderBottom: "1px solid #f0f0f0",
    background: "#fafafa",
  },
  cardIcon:  { fontSize: 15 },
  cardTitle: { fontSize: 13, fontWeight: 600, color: "#333" },

  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
  metricCell: {
    padding: "16px 18px",
    borderRight: "1px solid #f0f0f0",
    borderBottom: "1px solid #f0f0f0",
  },
  metricLabel: { fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: 0.6, display: "block", marginBottom: 5 },
  metricValue: { fontSize: 14, fontWeight: 600, color: "#111" },

  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    color: "#777",
    padding: "7px 18px",
    background: "#f8f9fa",
    borderTop: "1px solid #f0f0f0",
    borderBottom: "1px solid #f0f0f0",
  },

  dataGrid: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
  dataRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "9px 18px",
    borderBottom: "1px solid #f8f8f8",
    gap: 12,
  },
  dataLabel: { fontSize: 12, color: "#888", minWidth: 120 },
  dataValue: { fontSize: 13, color: "#111", fontWeight: 500, textAlign: "right" },

  finalAmountRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    background: "linear-gradient(to right, #f0fdf4, #dcfce7)",
    borderTop: "1px solid #bbf7d0",
    borderBottom: "1px solid #bbf7d0",
  },

  table:    { width: "100%", borderCollapse: "collapse" },
  thead:    { background: "#f8f9fa" },
  th: {
    padding: "9px 16px", textAlign: "left",
    fontSize: 11, fontWeight: 600, color: "#777",
    textTransform: "uppercase", letterSpacing: 0.5,
    borderBottom: "1px solid #eef0f4",
  },
  tbodyRow: { borderBottom: "1px solid #f5f5f5" },
  td:       { padding: "10px 16px", fontSize: 13, color: "#333" },

  codeChip: {
    background: "#f1f5f9",
    padding: "2px 8px",
    borderRadius: 5,
    fontFamily: "monospace",
    fontSize: 11,
    color: "#475569",
  },

  infoBadge: {
    display: "inline-flex", alignItems: "center",
    padding: "2px 10px", borderRadius: 999,
    fontSize: 11, fontWeight: 600,
    background: "#dbeafe", color: "#1d4ed8",
  },
  successBadge: {
    display: "inline-flex", alignItems: "center",
    padding: "2px 10px", borderRadius: 999,
    fontSize: 11, fontWeight: 600,
    background: "#dcfce7", color: "#15803d",
  },
  systemChip: {
    display: "inline-flex", alignItems: "center",
    padding: "2px 10px", borderRadius: 999,
    fontSize: 11, background: "#f3f4f6", color: "#555",
    border: "1px solid #e5e7eb",
  },

  providerChip: {
    display: "inline-flex", alignItems: "center",
    padding: "3px 12px", borderRadius: 999,
    fontSize: 11, fontWeight: 600, border: "1px solid transparent",
  },

  comboBtn: {
    padding: "4px 12px",
    fontSize: 11, fontWeight: 600,
    background: "#dbeafe", color: "#1d4ed8",
    border: "1px solid #bfdbfe",
    borderRadius: 999, cursor: "pointer",
    whiteSpace: "nowrap",
  },

  invBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "7px 14px", borderRadius: 8,
    textDecoration: "none", fontSize: 12, fontWeight: 600,
    border: "1px solid transparent",
  },

  refundBtn: {
    width: "100%", padding: "12px",
    background: "#fef2f2", color: "#b91c1c",
    border: "1px solid #fecaca",
    borderRadius: 8, fontSize: 13, fontWeight: 600,
    cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center", gap: 8,
  },

  refundBox: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: 8, padding: "14px 16px",
  },

  editBtn: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "6px 14px", background: "#2563eb",
    color: "#fff", borderRadius: 7,
    textDecoration: "none", fontSize: 12, fontWeight: 600,
  },

  modalClose: {
    position: "absolute", top: 12, right: 14,
    background: "none", border: "none",
    fontSize: 22, cursor: "pointer", color: "#555",
    lineHeight: 1, padding: 0,
  },
  modalClose2: {
    background: "none", border: "none",
    fontSize: 22, cursor: "pointer", color: "#555",
    lineHeight: 1, padding: 0,
  },
};

export default ProjectViewPage;