// import React, { useEffect, useState, useRef } from "react";
// import { Helmet } from "react-helmet-async";
// import {  Container, Stack, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {  useNavigate, useParams } from "react-router-dom"; 
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2"; 
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
 
// import { CreateTeam, SingleProject } from "src/Api/Api"; 
// import { projectdata } from "src/redux/slice/project";
// import { teamdata } from "src/redux/slice/team";
// import { Url } from "src/url/url";
// import axios from "axios";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   CircularProgress,
//   Box,
//   Avatar,
// } from "@mui/material";

// const MakeTeamPage = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { projectId } = useParams();
//   const roleAllData = useSelector((store) => store.role.data);
//   const staffAllData = useSelector((store) => store.staff.data.data);
 
//   const packageAllData = useSelector((store) => store.package.data); 
//   const [singelProject, setSingleProject] = useState();
//   const [createDate, setCreateDate] = useState({}); 
//   const [assistant, setAssistant] = useState({role: "", staffId: "", staffName: "",}); 
//   const [inputTeam, setInputTeam] = useState([{ role: "", staffId: "", staffName: "",}]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const datePickerRef = useRef(null);
// console.log("staffAllData",staffAllData)
// console.log("roleAllData",roleAllData)
// console.log("assistant",assistant)
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };
//   const handleInputFocus = () => {
//     if (datePickerRef.current) {
//       datePickerRef.current.setOpen(true);
//     }
//   };

//   const assistantHandle = async(e)=>{  
//     e.preventDefault()
//     let staff = e.target.value
//     let staffRole = e.target.name
//     staff = await JSON.parse(staff)
//     const updatedassistant = {...assistant}
//     updatedassistant.role = staffRole;
//     updatedassistant.staffId = staff._id;
//     updatedassistant.staffName = staff.firstName; 
//     setAssistant(updatedassistant)
//   } 
//   const getProjectFunc = async (projectId) => { 
    
//     const response = await axios.get(`${Url}/project/projectDetail/${projectId}`);  
//     setSingleProject(response?.data);
//     const dateString = response?.data.createdAt;
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const month = monthNames[date.getMonth()];
//     const year = String(date.getFullYear());
//     const hours = date.getHours();
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const timeOfDay = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;
//     const timezone = date.toString().match(/\((.+)\)/)[1];
//     setCreateDate({
//       day,
//       month,
//       year,
//       time: `${formattedHours}:${minutes} ${timeOfDay}`,
//       timezone,
//     });
//   };


//   const handleRoleChange = (e,index, selectedRole) => {
//     e.preventDefault();
//     const updatedInputTeam = [...inputTeam];
//     updatedInputTeam[index].role = selectedRole;
//     updatedInputTeam[index].staffId = "";
//     updatedInputTeam[index].staffName = "";
//     setInputTeam(updatedInputTeam);
//   }; 
//   // const handleStaffChange = async(e, index) => {
//   //   e.preventDefault()
//   //   let staff = e.target.value
//   //   staff = await JSON.parse(staff)
//   //   const updatedInputTeam = [...inputTeam]; 
//   //   updatedInputTeam[index].staffId = staff._id;
//   //   updatedInputTeam[index].staffName = staff.name;
//   //   setInputTeam(updatedInputTeam);
//   // };



// const handleStaffChange = async (e, index) => {
//   e.preventDefault();
//   let staff = e.target.value;
//   staff = JSON.parse(staff);
  
//   const updatedInputTeam = [...inputTeam];
//   updatedInputTeam[index].staffId = staff._id;
//   updatedInputTeam[index].staffName = `${staff.firstName} ${staff.lastName}`; // ✅ fix
//   setInputTeam(updatedInputTeam);
// };





//   const handleAddMore = (e) => {
//     e.preventDefault()
//     setInputTeam([...inputTeam, { role: "", staffId: "", staffName: ""}]);
//   };

//   const handleRemovePair = (e, indexToRemove) => {
//     e.preventDefault()
//     const updatedInputTeam = inputTeam.filter(
//       (_, index) => index !== indexToRemove
//     );
//     setInputTeam(updatedInputTeam);
//   };





  

//   // const submit = async (e)=>{
//   //     e.preventDefault() 
//   //     const data = {assistant : assistant , team : inputTeam}
//   //     const startDate = selectedDate
//   //     if(assistant && selectedDate){ 
//   //       await CreateTeam(data, projectId, startDate )
//   //       dispatch(projectdata())
//   //       dispatch(teamdata())
//   //       navigate("/dashboard/new-project")
//   //     }
//   //     else{
//   //       Swal.fire({
//   //         position: 'top-end',
//   //         icon: 'warning',
//   //         title: 'all feilds are required',
//   //         showConfirmButton: false,
//   //         timer: 1500
//   //       })
//   //     }
//   // }

//   const submit = async (e) => {
//     e.preventDefault();
  
//     const requiredTeamCount = singelProject?.service?.length || 0;
  
//     if (!assistant || !selectedDate) {
//       Swal.fire({
//         position: 'top-end',
//         icon: 'warning',
//         title: 'All fields are required',
//         showConfirmButton: false,
//         timer: 1500
//       });
//       return;
//     }
  
//     if (inputTeam.length < requiredTeamCount) {
//       Swal.fire({
//         position: 'center',
//         icon: 'warning',
//         title: `Please assign at least ${requiredTeamCount} team member(s) for ${requiredTeamCount} service(s).`,
//         showConfirmButton: false,
//         timer: 2000
//       });
//       return;
//     }
  
//     const data = { assistant: assistant, team: inputTeam };
  
//     try {
//       await CreateTeam(data, projectId, selectedDate);
//       dispatch(projectdata());
//       dispatch(teamdata());
//       navigate("/dashboard/new-project");
//     } catch (err) {
//       // Error toast already handled in CreateTeam
//     }
//   };
  


 
//    const CreateTeam = async (data, projectId, startDate) => {
    
//     try {
//       const responseData = await axios.post(`${Url}/team/add/${projectId}`, { ...data, startDate });
  
//       Swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'Team created successfully',
//         showConfirmButton: false,
//         timer: 1500,
//       });
  
//       return responseData;
//     } catch (error) {
//       console.log("CreateTeam API Error:", error);
  
//       const message =
//         error?.response?.data?.message || 'Something went wrong while creating the team.';
  
//       Swal.fire({
//         position: 'top-end',
//         icon: 'error',
//         title: message,
//         showConfirmButton: true,
//         timer: 2000,
//       });
  
//       throw new Error(message); // ye throw zaroori hai
//     }
//   };

  





//   function formatDate(dateString) {
//     if(dateString){
//     const [year, month, day] = dateString.split('-');
//     const date = new Date(year, month - 1, day); 
//     const formattedDay = date.getDate().toString().padStart(2, '0');
//     const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
//     const formattedYear = date.getFullYear().toString();

//     return `${formattedDay} ${formattedMonth} ${formattedYear}`;
//     }
//     }
 
//   useEffect(() => {
//     getProjectFunc(projectId);
//   }, []);


//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> project without team </title>
//       </Helmet>

// <Container>
 
//   <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
//     <Typography variant="h4" gutterBottom className="text-dark fw-bold">
//        Make Your Dream Team
//     </Typography>
//   </Stack>


//   <div className="make-team-section bg-white rounded-4 p-4 shadow-lg mb-5">
//     <div className="row g-4">
     
//       <div className="col-lg-6">
//   <div className="project-attractive-box p-4 rounded-4 border shadow-sm bg-white">
//     <h5 className="text-primary fw-bold mb-4">
//       <i className="bi bi-info-circle-fill me-2"></i>Project Details
//     </h5>
//     <ul className="list-unstyled mb-0">
//       <li className="mb-3">
//         <small className="text-muted">Project ID</small><br />
//         <span className="fw-semibold text-dark">{singelProject?._id}</span>
//       </li>
//       <li className="mb-3">
//         <small className="text-muted">Client Name</small><br />
//         <span className="fw-semibold text-dark">{singelProject?.clientName}</span>
//       </li>
//       <li className="mb-3">
//         <small className="text-muted">Client ID</small><br />
//         <span className="fw-semibold text-dark">{singelProject?.clientId}</span>
//       </li>
//       <li className="mb-3">
//         <small className="text-muted">Pricing</small><br />
//         <span className="fw-bold text-success">${singelProject?.totalPrice}</span>
//       </li>
//       <li className="mb-3">
//         <small className="text-muted">Project Buy</small><br />
//         <span className="fw-semibold text-dark">
//           {createDate && `${createDate.day} ${createDate.month} ${createDate.year}`}
//         </span>
//       </li>
//       <li>
//         <small className="text-muted">Package</small><br />
//         <span className="fw-semibold text-dark">
//           {packageAllData.length > 0 && singelProject?.projectType === "package"
//             ? packageAllData.find(pkg => pkg._id === singelProject.packageId)?.packageName
//             : "Custom Package"}
//         </span>
//       </li>
//     </ul>
//   </div>
// </div>


      
//       <div className="col-lg-6">
//         <div className="services-box p-4 bg-light rounded-4 border">
//           <h5 className="text-primary fw-semibold mb-3">🛠️ Services</h5>
//           {singelProject?.service?.map(service => (
//             <div key={service.serviceId} className="mb-3 pb-3 border-bottom">
//               <div className="d-flex justify-content-between align-items-center">
//                 <span className="fw-semibold">{service.serviceName}</span>
//                 <span
//                   className={`rounded-circle d-inline-block ${service.status === "complete" ? "bg-success" : "bg-warning"}`}
//                   style={{ width: "14px", height: "14px" }}
//                 ></span>
//               </div>
//               <small className="text-muted">
//                 {service.serviceStart && `${formatDate(service.serviceStart)} - ${formatDate(service.serviceEnd)}`}
//               </small>
//               <p className="text-muted mt-1 mb-0 fs-14">{service?.brief}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>

//   <div className="team-form-section bg-white p-4 rounded-4 shadow-lg mb-5">
//     <form>
//       <h5 className="text-primary mb-4 fw-semibold">👥 Choose Your Team</h5>

      
//       <div className="row mb-4">
//         <div className="col-md-4">
//           <input type="text" value="assistant" className="form-control" readOnly />
//         </div>
//         <div className="col-md-4">
//           <select onChange={assistantHandle} name="assistant" className="form-select">
//             <option disabled={assistant?.length > 0}>Choose</option>
//             {/* {staffAllData?.filter(val => val.role === "assistant").map((staffVal, idx) => (
//               <option key={idx} value={JSON.stringify(staffVal)}>{staffVal.firstName} {staffVal.lastName}  </option>
//             ))} */}

//             {/* {staffAllData
//   ?.filter(val => val.role === "assistant")
//   .map((staffVal, idx) => (
//     <option key={idx} value={JSON.stringify(staffVal)}>
//       {staffVal.firstName} {staffVal.lastName} 
//       {" "} | ⭐ {staffVal.avgRating || 0} 
//       {" "} | 🧩 ({staffVal.projectIds?.length || 0}) running projects
//     </option>
//   ))} */}
// {staffAllData
//   ?.filter(val => val.role === "assistant")
//   .map((staffVal, idx) => {
//     const runningCount = staffVal.projectIds?.length || 0;
//     const isOverloaded = runningCount > 20;

//     return (
//       <option
//         key={idx}
//         value={JSON.stringify(staffVal)}
//         disabled={isOverloaded} // ❌ disable if > 20
//         style={{
//           color: isOverloaded ? "#999" : "#000",
//           backgroundColor: isOverloaded ? "#f8d7da" : "transparent"
//         }}
//       >
//         {staffVal.firstName} {staffVal.lastName}
//         {" "} | ⭐ {staffVal.avgRating || 0}
//         {" "} | 🧩 ({runningCount}) running projects
//         {isOverloaded ? " — Max limit reached" : ""}
//       </option>
//     );
//   })}

//           </select>
//         </div>
//       </div>
// {/* 
//       {inputTeam.map((pair, idx) => (
//         <div key={idx} className="row mb-3 align-items-center">
//           <div className="col-md-4">
//             <select className="form-select" value={pair.role} onChange={e => handleRoleChange(e, idx, e.target.value)}>
//               <option value="">Select Role</option>
//               {roleAllData.map(role => (
//                 <option key={role._id} value={role.role}>{role.role}</option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-4">
//             {pair.role && (
//               <select className="form-select" value={pair.staff} onChange={e => handleStaffChange(e, idx)}>
//                 <option value="">Select Staff</option>
//                 {staffAllData.filter(s => s.role === pair.role).map(staff => (
//                   <option key={staff._id} value={JSON.stringify(staff)}>{staff.firstName} {staff.lastName}</option>
//                 ))}
//               </select>
//             )}
//           </div>
//           <div className="col-md-4">
//             {inputTeam.length > 1 && (
//               <button className="btn btn-outline-danger" onClick={e => handleRemovePair(e, idx)}>Remove</button>
//             )}
//           </div>
//         </div>
//       ))} */}
// {/* {inputTeam.map((pair, idx) => (
//   <div key={idx} className="row mb-3 align-items-center">
//     <div className="col-md-4">
//       <select
//         className="form-select"
//         value={pair.role}
//         onChange={e => handleRoleChange(e, idx, e.target.value)}
//       >
//         <option value="">Select Role</option>
//         {roleAllData.map(role => (
//           <option key={role._id} value={role.role}>{role.role}</option>
//         ))}
//       </select>
//     </div>

//     <div className="col-md-4">
//       {pair.role && (
//         <select
//           className="form-select"
//           value={pair.staff}
//           onChange={e => handleStaffChange(e, idx)}
//         >
//           <option value="">Select Staff</option>
//           {staffAllData
//             .filter(staff =>
//               staff.role === pair.role &&                // ✅ Same role
//               staff.avgRating >= 4 &&                    // ✅ Rating limit
//               (staff.projectIds?.length || 0) < 20       // ✅ Running projects limit
//             )
//             .map(staff => (
//               <option key={staff._id} value={JSON.stringify(staff)}>
//                 {staff.firstName} {staff.lastName} ⭐ {staff.avgRating || 0} | 🧩 ({staff.projectIds?.length || 0}) running
//               </option>
//             ))
//           }
//         </select>
//       )}
//     </div>

//     <div className="col-md-4">
//       {inputTeam.length > 1 && (
//         <button
//           className="btn btn-outline-danger"
//           onClick={e => handleRemovePair(e, idx)}
//         >
//           Remove
//         </button>
//       )}
//     </div>
//   </div>
// ))} */}
// {inputTeam.map((pair, idx) => (
//   <div key={idx} className="row mb-3 align-items-center">
//     {/* ROLE SELECT */}
//     <div className="col-md-4">
//       <select
//         className="form-select"
//         value={pair.role}
//         onChange={e => handleRoleChange(e, idx, e.target.value)}
//       >
//         <option value="">Select Role</option>
//         {roleAllData.map(role => (
//           <option key={role._id} value={role.role}>
//             {role.role}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* STAFF SELECT */}
//     <div className="col-md-4">
//       {pair.role && (
//         // <select
//         //   className="form-select"
//         //   value={pair.staff}
//         //   onChange={e => handleStaffChange(e, idx)}
//         // >
//         //   <option value="">Select Staff</option>
//         //   {staffAllData
//         //     .filter(staff => staff.role === pair.role) // same role only
//         //     .map(staff => {
//         //       const running = staff.projectIds?.length || 0;
//         //       const isAssistant = staff.role?.toLowerCase() === "assistant";
//         //       const limit = isAssistant ? 20 : 10; // assistant=20 others=10
//         //       const isDisabled = running > limit;

//         //       return (
//         //         <option
//         //           key={staff._id}
//         //           value={JSON.stringify(staff)}
//         //           disabled={isDisabled}
//         //           style={isDisabled ? { color: "gray" } : {}}
//         //         >
//         //           {staff.firstName} {staff.lastName}{" "}
//         //           ⭐ {staff.avgRating || 0} | 🧩 ({running}) running{" "}
//         //           {isDisabled && "⚠️"}
//         //         </option>
//         //       );
//         //     })}
//         // </select>

//         <FormControl fullWidth size="small">
//   <InputLabel>Select Staff</InputLabel>
//   <Select
//     value={pair.staff || ""}
//     label="Select Staff"
//     onChange={e => handleStaffChange(e, idx)}
//     renderValue={(selected) => {
//       if (!selected) return "Select Staff";
//       const staff = JSON.parse(selected);
//       return `${staff.firstName} ${staff.lastName}`;
//     }}
//   >
//     {staffAllData
//       ?.filter(staff => staff.role === pair.role)
//       .map(staff => {
//         const running = staff.projectIds?.length || 0;
//         const isAssistant = staff.role?.toLowerCase() === "assistant";
//         const limit = isAssistant ? 20 : 10;
//         const progress = Math.min((running / limit) * 100, 100);
//         const isOverloaded = running >= limit;

//         return (
//           <MenuItem
//             key={staff._id}
//             value={JSON.stringify(staff)}
//             disabled={isOverloaded}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               opacity: isOverloaded ? 0.6 : 1,
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 28,
//                 height: 28,
//                 bgcolor: "primary.main",
//                 fontSize: 13,
//               }}
//             >
//               {staff.firstName?.charAt(0)?.toUpperCase()}
//             </Avatar>

//             <Box flexGrow={1}>
//               <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                 {staff.firstName} {staff.lastName}
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 ⭐ {staff.avgRating || 0}/10
//               </Typography>
//             </Box>

//             <Box position="relative" display="inline-flex">
//               <CircularProgress
//                 variant="determinate"
//                 value={progress}
//                 size={28}
//                 thickness={5}
//                 sx={{
//                   color:
//                     progress < 50
//                       ? "success.main"
//                       : progress < 80
//                       ? "warning.main"
//                       : "error.main",
//                 }}
//               />
//               <Box
//                 top={0}
//                 left={0}
//                 bottom={0}
//                 right={0}
//                 position="absolute"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//               >
//                 <Typography
//                   variant="caption"
//                   component="div"
//                   color="text.secondary"
//                   fontSize={10}
//                 >
//                   {running}
//                 </Typography>
//               </Box>
//             </Box>
//           </MenuItem>
//         );
//       })}
//   </Select>
// </FormControl>

//       )}
//     </div>

//     {/* REMOVE BUTTON */}
//     <div className="col-md-4">
//       {inputTeam.length > 1 && (
//         <button
//           className="btn btn-outline-danger"
//           onClick={e => handleRemovePair(e, idx)}
//         >
//           Remove
//         </button>
//       )}
//     </div>
//   </div>
// ))}

     
//       <div className="mb-3">
//         <button className="btn btn-outline-primary me-2" onClick={handleAddMore}>Add More +</button>
//       </div>

//       <div className="mb-4">
//         <label className="form-label text-primary fs-14">📅 Select a start date</label>
//         <DatePicker
//           ref={datePickerRef}
//           selected={selectedDate}
//           onChange={handleDateChange}
//           dateFormat="dd/MM/yyyy"
//           isClearable
//           showYearDropdown
//           scrollableYearDropdown
//           className="form-control"
//           placeholderText="dd/mm/yyyy"
//         />
//       </div>

     
//       <div>
//         <button className="btn btn-success" onClick={(e) => submit(e)}>
//           Create Team <i className="fa-solid fa-user-plus ms-2"></i>
//         </button>
//       </div>
//     </form>
//   </div>
// </Container>


//     </>
//   );
// };

// export default MakeTeamPage;







// import React, { useEffect, useState, useRef } from "react";
// import { Helmet } from "react-helmet-async";
// import {
//   Container,
//   Stack,
//   Typography,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   CircularProgress,
//   Box,
//   Avatar,
//   Rating,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import { projectdata } from "src/redux/slice/project";
// import { teamdata } from "src/redux/slice/team";
// import { Url } from "src/url/url";
// import axios from "axios";

// const MakeTeamPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { projectId } = useParams();
//   const roleAllData = useSelector((store) => store.role.data);
//   const staffAllData = useSelector((store) => store.staff.data.data);
//   const packageAllData = useSelector((store) => store.package.data);
//   const [singelProject, setSingleProject] = useState();
//   const [createDate, setCreateDate] = useState({});
//   const [assistant, setAssistant] = useState({
//     role: "",
//     staffId: "",
//     staffName: "",
//   });
//   const [inputTeam, setInputTeam] = useState([
//     { role: "", staffId: "", staffName: "" },
//   ]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const datePickerRef = useRef(null);

//   const handleDateChange = (date) => setSelectedDate(date);

//   const getProjectFunc = async (projectId) => {
//     const response = await axios.get(`${Url}/project/projectDetail/${projectId}`);
//     setSingleProject(response?.data);
//     const dateString = response?.data.createdAt;
//     const date = new Date(dateString);
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     setCreateDate({
//       day: String(date.getDate()).padStart(2, "0"),
//       month: monthNames[date.getMonth()],
//       year: date.getFullYear(),
//     });
//   };

//   const handleRoleChange = (e, index, selectedRole) => {
//     const updatedInputTeam = [...inputTeam];
//     updatedInputTeam[index].role = selectedRole;
//     updatedInputTeam[index].staffId = "";
//     updatedInputTeam[index].staffName = "";
//     setInputTeam(updatedInputTeam);
//   };

//   const handleStaffChange = (e, index) => {
//     const staff = JSON.parse(e.target.value);
//     const updatedInputTeam = [...inputTeam];
//     updatedInputTeam[index].staffId = staff._id;
//     updatedInputTeam[index].staffName = `${staff.firstName} ${staff.lastName}`;
//     setInputTeam(updatedInputTeam);
//   };

//   const handleAddMore = (e) => {
//     e.preventDefault();
//     setInputTeam([...inputTeam, { role: "", staffId: "", staffName: "" }]);
//   };

//   const handleRemovePair = (e, indexToRemove) => {
//     e.preventDefault();
//     setInputTeam(inputTeam.filter((_, i) => i !== indexToRemove));
//   };

//   const CreateTeam = async (data, projectId, startDate) => {
//     try {
//       const responseData = await axios.post(`${Url}/team/add/${projectId}`, {
//         ...data,
//         startDate,
//       });
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Team created successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return responseData;
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         "Something went wrong while creating the team.";
//       Swal.fire({
//         position: "top-end",
//         icon: "error",
//         title: message,
//         showConfirmButton: true,
//         timer: 2000,
//       });
//       throw new Error(message);
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     const requiredTeamCount = singelProject?.service?.length || 0;

//     if (!assistant?.staffId || !selectedDate) {
//       Swal.fire({
//         position: "top-end",
//         icon: "warning",
//         title: "All fields are required",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     if (inputTeam.length < requiredTeamCount) {
//       Swal.fire({
//         position: "center",
//         icon: "warning",
//         title: `Please assign at least ${requiredTeamCount} team member(s)`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       return;
//     }

//     const data = { assistant, team: inputTeam };
//     await CreateTeam(data, projectId, selectedDate);
//     dispatch(projectdata());
//     dispatch(teamdata());
//     navigate("/dashboard/new-project");
//   };

//   useEffect(() => {
//     getProjectFunc(projectId);
//   }, []);

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Project without team</title>
//       </Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
//           <Typography variant="h4" className="text-dark fw-bold">
//             Make Your Dream Team
//           </Typography>
//         </Stack>

//         <div className="team-form-section bg-white p-4 rounded-4 shadow-lg mb-5">
//           <form>
//             <h5 className="text-primary mb-4 fw-semibold">👥 Choose Your Team</h5>

//             {/* === Assistant Select === */}
//             <div className="row mb-4">
//               <div className="col-md-4">
//                 <input type="text" value="assistant" className="form-control" readOnly />
//               </div>
//               <div className="col-md-4">
//                 <FormControl fullWidth size="small">
//                   <InputLabel>Select Assistant</InputLabel>
//                   <Select
//                     value={assistant.staffId ? JSON.stringify(assistant) : ""}
//                     label="Select Assistant"
//                     onChange={(e) => {
//                       const staff = JSON.parse(e.target.value);
//                       setAssistant({
//                         role: "assistant",
//                         staffId: staff._id,
//                         staffName: `${staff.firstName} ${staff.lastName}`,
//                       });
//                     }}
//                     renderValue={(selected) => {
//                       if (!selected) return "Select Assistant";
//                       const staff = JSON.parse(selected);
//                       return `${staff.staffName || staff.firstName}`;
//                     }}
//                   >
//                     {staffAllData
//                       ?.filter((s) => s.role === "assistant")
//                       .map((staffVal, idx) => {
//                         const running = staffVal.projectIds?.length || 0;
//                         const progress = Math.min((running / 20) * 100, 100);
//                         const isOverloaded = running > 20;

//                         return (
//                           <MenuItem
//                             key={idx}
//                             value={JSON.stringify(staffVal)}
//                             disabled={isOverloaded}
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 1.5,
//                               opacity: isOverloaded ? 0.6 : 1,
//                             }}
//                           >
//                             <Avatar
//                               sx={{
//                                 width: 28,
//                                 height: 28,
//                                 bgcolor: "primary.main",
//                                 fontSize: 13,
//                               }}
//                             >
//                               {staffVal.firstName?.charAt(0)?.toUpperCase()}
//                             </Avatar>
//                             <Box flexGrow={1}>
//                               <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                 {staffVal.firstName} {staffVal.lastName}
//                               </Typography>
//                               <Rating
//                                 name="read-only"
//                                 value={Number(staffVal.avgRating || 0)}
//                                 precision={0.5}
//                                 readOnly
//                                 size="small"
//                               />
//                             </Box>

//                             <Box position="relative" display="inline-flex">
//                               <CircularProgress
//                                 variant="determinate"
//                                 value={progress}
//                                 size={28}
//                                 thickness={5}
//                                 sx={{
//                                   color:
//                                     progress < 50
//                                       ? "success.main"
//                                       : progress < 80
//                                       ? "warning.main"
//                                       : "error.main",
//                                 }}
//                               />
//                               <Box
//                                 top={0}
//                                 left={0}
//                                 bottom={0}
//                                 right={0}
//                                 position="absolute"
//                                 display="flex"
//                                 alignItems="center"
//                                 justifyContent="center"
//                               >
//                                 <Typography
//                                   variant="caption"
//                                   component="div"
//                                   color="text.secondary"
//                                   fontSize={10}
//                                 >
//                                   {running}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                           </MenuItem>
//                         );
//                       })}
//                   </Select>
//                 </FormControl>
//               </div>
//             </div>

//             {/* === Team Members === */}
//             {inputTeam.map((pair, idx) => (
//               <div key={idx} className="row mb-3 align-items-center">
//                 {/* Role Select */}
//                 <div className="col-md-4">
//                   <select
//                     className="form-select"
//                     value={pair.role}
//                     onChange={(e) => handleRoleChange(e, idx, e.target.value)}
//                   >
//                     <option value="">Select Role</option>
//                     {roleAllData.map((role) => (
//                       <option key={role._id} value={role.role}>
//                         {role.role}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Staff Select */}
//                 <div className="col-md-4">
//                   {pair.role && (
//                     <FormControl fullWidth size="small">
//                       <InputLabel>Select Staff</InputLabel>
//                       <Select
//                         value={pair.staffId ? JSON.stringify(pair) : ""}
//                         label="Select Staff"
//                         onChange={(e) => handleStaffChange(e, idx)}
//                         renderValue={(selected) => {
//                           if (!selected) return "Select Staff";
//                           const staff = JSON.parse(selected);
//                           return `${staff.staffName || staff.firstName}`;
//                         }}
//                       >
//                         {staffAllData
//                           ?.filter((staff) => staff.role === pair.role)
//                           .map((staff) => {
//                             const running = staff.projectIds?.length || 0;
//                             const isAssistant =
//                               staff.role?.toLowerCase() === "assistant";
//                             const limit = isAssistant ? 20 : 10;
//                             const progress = Math.min((running / limit) * 100, 100);
//                             const isOverloaded = running >= limit;

//                             return (
//                               <MenuItem
//                                 key={staff._id}
//                                 value={JSON.stringify(staff)}
//                                 disabled={isOverloaded}
//                                 sx={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: 1.5,
//                                   opacity: isOverloaded ? 0.6 : 1,
//                                 }}
//                               >
//                                 <Avatar
//                                   sx={{
//                                     width: 28,
//                                     height: 28,
//                                     bgcolor: "primary.main",
//                                     fontSize: 13,
//                                   }}
//                                 >
//                                   {staff.firstName?.charAt(0)?.toUpperCase()}
//                                 </Avatar>

//                                 <Box flexGrow={1}>
//                                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                     {staff.firstName} {staff.lastName}
//                                   </Typography>
//                                   <Rating
//                                     name="read-only"
//                                     value={Number(staff.avgRating || 0)}
//                                     precision={0.5}
//                                     readOnly
//                                     size="small"
//                                   />
//                                 </Box>

//                                 <Box position="relative" display="inline-flex">
//                                   <CircularProgress
//                                     variant="determinate"
//                                     value={progress}
//                                     size={28}
//                                     thickness={5}
//                                     sx={{
//                                       color:
//                                         progress < 50
//                                           ? "success.main"
//                                           : progress < 80
//                                           ? "warning.main"
//                                           : "error.main",
//                                     }}
//                                   />
//                                   <Box
//                                     top={0}
//                                     left={0}
//                                     bottom={0}
//                                     right={0}
//                                     position="absolute"
//                                     display="flex"
//                                     alignItems="center"
//                                     justifyContent="center"
//                                   >
//                                     <Typography
//                                       variant="caption"
//                                       component="div"
//                                       color="text.secondary"
//                                       fontSize={10}
//                                     >
//                                       {running}
//                                     </Typography>
//                                   </Box>
//                                 </Box>
//                               </MenuItem>
//                             );
//                           })}
//                       </Select>
//                     </FormControl>
//                   )}
//                 </div>

//                 {/* Remove button */}
//                 <div className="col-md-4">
//                   {inputTeam.length > 1 && (
//                     <button
//                       className="btn btn-outline-danger"
//                       onClick={(e) => handleRemovePair(e, idx)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}

//             <div className="mb-3">
//               <button className="btn btn-outline-primary me-2" onClick={handleAddMore}>
//                 Add More +
//               </button>
//             </div>

//             <div className="mb-4">
//               <label className="form-label text-primary fs-14">
//                 📅 Select a start date
//               </label>
//               <DatePicker
//                 ref={datePickerRef}
//                 selected={selectedDate}
//                 onChange={handleDateChange}
//                 dateFormat="dd/MM/yyyy"
//                 className="form-control"
//                 placeholderText="dd/mm/yyyy"
//               />
//             </div>

//             <div>
//               <button className="btn btn-success" onClick={(e) => submit(e)}>
//                 Create Team <i className="fa-solid fa-user-plus ms-2"></i>
//               </button>
//             </div>
//           </form>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default MakeTeamPage;





import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Box,
  Avatar,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { projectdata } from "src/redux/slice/project";
import { teamdata } from "src/redux/slice/team";
import { Url } from "src/url/url";
import axios from "axios";

const MakeTeamPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const roleAllData = useSelector((store) => store.role.data);
  const staffAllData = useSelector((store) => store.staff.data.data);
  const packageAllData = useSelector((store) => store.package.data);
  const [singelProject, setSingleProject] = useState();
  const [createDate, setCreateDate] = useState({});
  const [assistant, setAssistant] = useState({
    role: "",
    staffId: "",
    staffName: "",
  });
  const [inputTeam, setInputTeam] = useState([
    { role: "", staffId: "", staffName: "" },
  ]);
  const [selectedDate, setSelectedDate] = useState(null); // ✅ Start Date
  const [endDate, setEndDate] = useState(null); // ✅ End Date added here
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => setSelectedDate(date);
  const handleEndDateChange = (date) => setEndDate(date); // ✅ handle end date

  const getProjectFunc = async (projectId) => {
    const response = await axios.get(`${Url}/project/projectDetail/${projectId}`);
    setSingleProject(response?.data);
    const dateString = response?.data.createdAt;
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setCreateDate({
      day: String(date.getDate()).padStart(2, "0"),
      month: monthNames[date.getMonth()],
      year: date.getFullYear(),
    });
  };

  const handleRoleChange = (e, index, selectedRole) => {
    const updatedInputTeam = [...inputTeam];
    updatedInputTeam[index].role = selectedRole;
    updatedInputTeam[index].staffId = "";
    updatedInputTeam[index].staffName = "";
    setInputTeam(updatedInputTeam);
  };

  const handleStaffChange = (e, index) => {
    const staff = JSON.parse(e.target.value);
    const updatedInputTeam = [...inputTeam];
    updatedInputTeam[index].staffId = staff._id;
    updatedInputTeam[index].staffName = `${staff.firstName} ${staff.lastName}`;
    setInputTeam(updatedInputTeam);
  };

  const handleAddMore = (e) => {
    e.preventDefault();
    setInputTeam([...inputTeam, { role: "", staffId: "", staffName: "" }]);
  };

  const handleRemovePair = (e, indexToRemove) => {
    e.preventDefault();
    setInputTeam(inputTeam.filter((_, i) => i !== indexToRemove));
  };

  // ✅ Updated CreateTeam function with endDate
  const CreateTeam = async (data, projectId, startDate, endDate) => {
    try {
      const responseData = await axios.post(`${Url}/team/add/${projectId}`, {
        ...data,
        startDate,
        endDate, // ✅ sending to backend
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Team created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      return responseData;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while creating the team.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: true,
        timer: 2000,
      });
      throw new Error(message);
    }
  };

  // ✅ Updated submit to include endDate
  const submit = async (e) => {
    e.preventDefault();
    const requiredTeamCount = singelProject?.service?.length || 0;

    if (!assistant?.staffId || !selectedDate || !endDate) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "All fields are required (including start & end date)",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (inputTeam.length < requiredTeamCount) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Please assign at least ${requiredTeamCount} team member(s)`,
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const data = { assistant, team: inputTeam };
    await CreateTeam(data, projectId, selectedDate, endDate); // ✅ both dates
    dispatch(projectdata());
    dispatch(teamdata());
    navigate("/dashboard/new-project");
  };

  useEffect(() => {
    getProjectFunc(projectId);
  }, []);

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Project without team</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" className="text-dark fw-bold">
            Make Your Dream Team
          </Typography>
        </Stack>

        <div className="team-form-section bg-white p-4 rounded-4 shadow-lg mb-5">
          <form>
            <h5 className="text-primary mb-4 fw-semibold">👥 Choose Your Team</h5>

            {/* === Assistant Select === */}
            <div className="row mb-4">
              <div className="col-md-4">
                <input type="text" value="assistant" className="form-control" readOnly />
              </div>
              <div className="col-md-4">
                <FormControl fullWidth size="small">
                  <InputLabel>Select Assistant</InputLabel>
                  <Select
                    value={assistant.staffId ? JSON.stringify(assistant) : ""}
                    label="Select Assistant"
                    onChange={(e) => {
                      const staff = JSON.parse(e.target.value);
                      setAssistant({
                        role: "assistant",
                        staffId: staff._id,
                        staffName: `${staff.firstName} ${staff.lastName}`,
                      });
                    }}
                    renderValue={(selected) => {
                      if (!selected) return "Select Assistant";
                      const staff = JSON.parse(selected);
                      return `${staff.staffName || staff.firstName}`;
                    }}
                  >
                    {staffAllData
                      ?.filter((s) => s.role === "assistant")
                      .map((staffVal, idx) => {
                        const running = staffVal.projectIds?.length || 0;
                        const progress = Math.min((running / 20) * 100, 100);
                        const isOverloaded = running > 20;

                        return (
                          <MenuItem
                            key={idx}
                            value={JSON.stringify(staffVal)}
                            disabled={isOverloaded}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              opacity: isOverloaded ? 0.6 : 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                bgcolor: "primary.main",
                                fontSize: 13,
                              }}
                            >
                              {staffVal.firstName?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Box flexGrow={1}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {staffVal.firstName} {staffVal.lastName}
                              </Typography>
                              <Rating
                                name="read-only"
                                value={Number(staffVal.avgRating || 0)}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                            </Box>

                            <Box position="relative" display="inline-flex">
                              <CircularProgress
                                variant="determinate"
                                value={progress}
                                size={28}
                                thickness={5}
                                sx={{
                                  color:
                                    progress < 50
                                      ? "success.main"
                                      : progress < 80
                                      ? "warning.main"
                                      : "error.main",
                                }}
                              />
                              <Box
                                top={0}
                                left={0}
                                bottom={0}
                                right={0}
                                position="absolute"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Typography
                                  variant="caption"
                                  component="div"
                                  color="text.secondary"
                                  fontSize={10}
                                >
                                  {running}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* === Team Members === */}
            {inputTeam.map((pair, idx) => (
              <div key={idx} className="row mb-3 align-items-center">
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={pair.role}
                    onChange={(e) => handleRoleChange(e, idx, e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roleAllData.map((role) => (
                      <option key={role._id} value={role.role}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  {pair.role && (
                    <FormControl fullWidth size="small">
                      <InputLabel>Select Staff</InputLabel>
                      <Select
                        value={pair.staffId ? JSON.stringify(pair) : ""}
                        label="Select Staff"
                        onChange={(e) => handleStaffChange(e, idx)}
                        renderValue={(selected) => {
                          if (!selected) return "Select Staff";
                          const staff = JSON.parse(selected);
                          return `${staff.staffName || staff.firstName}`;
                        }}
                      >
                        {staffAllData
                          ?.filter((staff) => staff.role === pair.role)
                          .map((staff) => {
                            const running = staff.projectIds?.length || 0;
                            const isAssistant =
                              staff.role?.toLowerCase() === "assistant";
                            const limit = isAssistant ? 20 : 10;
                            const progress = Math.min((running / limit) * 100, 100);
                            const isOverloaded = running >= limit;

                            return (
                              <MenuItem
                                key={staff._id}
                                value={JSON.stringify(staff)}
                                disabled={isOverloaded}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                  opacity: isOverloaded ? 0.6 : 1,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: "primary.main",
                                    fontSize: 13,
                                  }}
                                >
                                  {staff.firstName?.charAt(0)?.toUpperCase()}
                                </Avatar>

                                <Box flexGrow={1}>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {staff.firstName} {staff.lastName}
                                  </Typography>
                                  <Rating
                                    name="read-only"
                                    value={Number(staff.avgRating || 0)}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                  />
                                </Box>

                                <Box position="relative" display="inline-flex">
                                  <CircularProgress
                                    variant="determinate"
                                    value={progress}
                                    size={28}
                                    thickness={5}
                                    sx={{
                                      color:
                                        progress < 50
                                          ? "success.main"
                                          : progress < 80
                                          ? "warning.main"
                                          : "error.main",
                                    }}
                                  />
                                  <Box
                                    top={0}
                                    left={0}
                                    bottom={0}
                                    right={0}
                                    position="absolute"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Typography
                                      variant="caption"
                                      component="div"
                                      color="text.secondary"
                                      fontSize={10}
                                    >
                                      {running}
                                    </Typography>
                                  </Box>
                                </Box>
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  )}
                </div>

                <div className="col-md-4">
                  {inputTeam.length > 1 && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => handleRemovePair(e, idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="mb-3">
              <button className="btn btn-outline-primary me-2" onClick={handleAddMore}>
                Add More +
              </button>
            </div>

            {/* ✅ Start + End Date Section */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <label className="form-label text-primary fs-14">📅 Select Start Date</label>
                <DatePicker
                  ref={datePickerRef}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="dd/mm/yyyy"
                  selectsStart
                  startDate={selectedDate}
                  endDate={endDate}
                />
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label text-primary fs-14">📅 Select End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="dd/mm/yyyy"
                  selectsEnd
                  startDate={selectedDate}
                  endDate={endDate}
                  minDate={selectedDate}
                />
              </div>
            </div>

            <div>
              <button className="btn btn-success" onClick={(e) => submit(e)}>
                Create Team <i className="fa-solid fa-user-plus ms-2"></i>
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default MakeTeamPage;












// import React, { useEffect, useState, useRef } from "react";
// import { Helmet } from "react-helmet-async";
// import {
//   Container,
//   Stack,
//   Typography,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   CircularProgress,
//   Box,
//   Avatar,
//   Rating,
//   Card,
//   CardContent,
//   Button,
//   IconButton,
//   Chip,
//   Divider,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { projectdata } from "src/redux/slice/project";
// import { teamdata } from "src/redux/slice/team";
// import { Url } from "src/url/url";
// import axios from "axios";
// import PeopleIcon from '@mui/icons-material/People';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// const MakeTeamPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { projectId } = useParams();
//   const roleAllData = useSelector((store) => store.role.data);
//   const staffAllData = useSelector((store) => store.staff.data.data);
//   const packageAllData = useSelector((store) => store.package.data);
//   const [singelProject, setSingleProject] = useState();
//   const [createDate, setCreateDate] = useState({});
//   const [assistant, setAssistant] = useState({
//     role: "",
//     staffId: "",
//     staffName: "",
//   });
//   const [inputTeam, setInputTeam] = useState([
//     { role: "", staffId: "", staffName: "" },
//   ]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const datePickerRef = useRef(null);

//   const handleDateChange = (date) => setSelectedDate(date);
//   const handleEndDateChange = (date) => setEndDate(date);

//   const getProjectFunc = async (projectId) => {
//     const response = await axios.get(`${Url}/project/projectDetail/${projectId}`);
//     setSingleProject(response?.data);
//     const dateString = response?.data.createdAt;
//     const date = new Date(dateString);
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     setCreateDate({
//       day: String(date.getDate()).padStart(2, "0"),
//       month: monthNames[date.getMonth()],
//       year: date.getFullYear(),
//     });
//   };

//   const handleRoleChange = (e, index, selectedRole) => {
//     const updatedInputTeam = [...inputTeam];
//     updatedInputTeam[index].role = selectedRole;
//     updatedInputTeam[index].staffId = "";
//     updatedInputTeam[index].staffName = "";
//     setInputTeam(updatedInputTeam);
//   };

//   const handleStaffChange = (e, index) => {
//     const staff = JSON.parse(e.target.value);
//     const updatedInputTeam = [...inputTeam];
//     updatedInputTeam[index].staffId = staff._id;
//     updatedInputTeam[index].staffName = `${staff.firstName} ${staff.lastName}`;
//     setInputTeam(updatedInputTeam);
//   };

//   const handleAddMore = (e) => {
//     e.preventDefault();
//     setInputTeam([...inputTeam, { role: "", staffId: "", staffName: "" }]);
//   };

//   const handleRemovePair = (e, indexToRemove) => {
//     e.preventDefault();
//     setInputTeam(inputTeam.filter((_, i) => i !== indexToRemove));
//   };

//   const CreateTeam = async (data, projectId, startDate, endDate) => {
//     try {
//       const responseData = await axios.post(`${Url}/team/add/${projectId}`, {
//         ...data,
//         startDate,
//         endDate,
//       });
//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Team created successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return responseData;
//     } catch (error) {
//       const message =
//         error?.response?.data?.message ||
//         "Something went wrong while creating the team.";
//       Swal.fire({
//         position: "top-end",
//         icon: "error",
//         title: message,
//         showConfirmButton: true,
//         timer: 2000,
//       });
//       throw new Error(message);
//     }
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     const requiredTeamCount = singelProject?.service?.length || 0;

//     if (!assistant?.staffId || !selectedDate || !endDate) {
//       Swal.fire({
//         position: "top-end",
//         icon: "warning",
//         title: "All fields are required (including start & end date)",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     if (inputTeam.length < requiredTeamCount) {
//       Swal.fire({
//         position: "center",
//         icon: "warning",
//         title: `Please assign at least ${requiredTeamCount} team member(s)`,
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       return;
//     }

//     const data = { assistant, team: inputTeam };
//     await CreateTeam(data, projectId, selectedDate, endDate);
//     dispatch(projectdata());
//     dispatch(teamdata());
//     navigate("/dashboard/new-project");
//   };

//   useEffect(() => {
//     getProjectFunc(projectId);
//   }, []);

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Helmet>
//         <title>Create Team | GigBig</title>
//       </Helmet>

//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         {/* Header */}
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
//           <Box>
//             <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
//               <PeopleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
//               <Typography variant="h4" fontWeight={700} color="primary">
//                 Build Your Team
//               </Typography>
//             </Stack>
//             <Typography variant="body2" color="text.secondary">
//               Assign team members and set project timeline
//             </Typography>
//           </Box>
//         </Stack>

//         {/* Main Form Card */}
//         <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden' }}>
//           {/* Card Header */}
//           <Box sx={{ 
//             bgcolor: 'white',
//             borderBottom: '2px solid #e8e8e8',
//             p: 3
//           }}>
//             <Stack direction="row" spacing={1.5} alignItems="center">
//               <PersonAddIcon sx={{ fontSize: 26, color: '#3b82f6' }} />
//               <Typography variant="h6" fontWeight={700} color="text.primary">
//                 Team Configuration
//               </Typography>
//             </Stack>
//           </Box>

//           <CardContent sx={{ p: 4, bgcolor: '#fafbfc' }}>
//             <form onSubmit={submit}>
//               {/* Assistant Section */}
//               <Box sx={{ 
//                 bgcolor: 'white',
//                 p: 3,
//                 borderRadius: 2,
//                 mb: 3,
//                 border: '1px solid #e8e8e8'
//               }}>
//                 <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={2.5}>
//                   Project Assistant
//                 </Typography>
//                 <Box sx={{ 
//                   display: 'grid', 
//                   gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
//                   gap: 2,
//                   alignItems: 'center'
//                 }}>
//                   <Box>
//                     <Typography 
//                       variant="body2" 
//                       sx={{ 
//                         bgcolor: '#f1f5f9',
//                         px: 2,
//                         py: 1.5,
//                         borderRadius: 1.5,
//                         fontWeight: 600,
//                         color: '#475569',
//                         textAlign: 'center'
//                       }}
//                     >
//                       Assistant
//                     </Typography>
//                   </Box>
//                   <FormControl fullWidth>
//                     <InputLabel>Select Assistant</InputLabel>
//                     <Select
//                       value={assistant.staffId ? JSON.stringify(assistant) : ""}
//                       label="Select Assistant"
//                       onChange={(e) => {
//                         const staff = JSON.parse(e.target.value);
//                         setAssistant({
//                           role: "assistant",
//                           staffId: staff._id,
//                           staffName: `${staff.firstName} ${staff.lastName}`,
//                         });
//                       }}
//                       renderValue={(selected) => {
//                         if (!selected) return "Select Assistant";
//                         const staff = JSON.parse(selected);
//                         return `${staff.staffName || staff.firstName}`;
//                       }}
//                       sx={{
//                         bgcolor: 'white',
//                         '& .MuiOutlinedInput-notchedOutline': {
//                           borderColor: '#e0e0e0',
//                         },
//                         '&:hover .MuiOutlinedInput-notchedOutline': {
//                           borderColor: '#3b82f6',
//                         },
//                       }}
//                     >
//                       {staffAllData
//                         ?.filter((s) => s.role === "assistant")
//                         .map((staffVal, idx) => {
//                           const running = staffVal.projectIds?.length || 0;
//                           const progress = Math.min((running / 20) * 100, 100);
//                           const isOverloaded = running > 20;

//                           return (
//                             <MenuItem
//                               key={idx}
//                               value={JSON.stringify(staffVal)}
//                               disabled={isOverloaded}
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 1.5,
//                                 opacity: isOverloaded ? 0.6 : 1,
//                                 py: 1.5,
//                               }}
//                             >
//                               <Avatar
//                                 sx={{
//                                   width: 36,
//                                   height: 36,
//                                   bgcolor: "primary.main",
//                                   fontSize: 14,
//                                   fontWeight: 700
//                                 }}
//                               >
//                                 {staffVal.firstName?.charAt(0)?.toUpperCase()}
//                               </Avatar>
//                               <Box flexGrow={1}>
//                                 <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                                   {staffVal.firstName} {staffVal.lastName}
//                                 </Typography>
//                                 <Rating
//                                   name="read-only"
//                                   value={Number(staffVal.avgRating || 0)}
//                                   precision={0.5}
//                                   readOnly
//                                   size="small"
//                                 />
//                               </Box>

//                               <Box position="relative" display="inline-flex">
//                                 <CircularProgress
//                                   variant="determinate"
//                                   value={progress}
//                                   size={36}
//                                   thickness={5}
//                                   sx={{
//                                     color:
//                                       progress < 50
//                                         ? "success.main"
//                                         : progress < 80
//                                         ? "warning.main"
//                                         : "error.main",
//                                   }}
//                                 />
//                                 <Box
//                                   top={0}
//                                   left={0}
//                                   bottom={0}
//                                   right={0}
//                                   position="absolute"
//                                   display="flex"
//                                   alignItems="center"
//                                   justifyContent="center"
//                                 >
//                                   <Typography
//                                     variant="caption"
//                                     component="div"
//                                     sx={{ fontWeight: 700, fontSize: 11 }}
//                                   >
//                                     {running}
//                                   </Typography>
//                                 </Box>
//                               </Box>
//                             </MenuItem>
//                           );
//                         })}
//                     </Select>
//                   </FormControl>
//                 </Box>
//               </Box>

//               <Divider sx={{ my: 3 }} />

//               {/* Team Members Section */}
//               <Box sx={{ 
//                 bgcolor: 'white',
//                 p: 3,
//                 borderRadius: 2,
//                 mb: 3,
//                 border: '1px solid #e8e8e8'
//               }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
//                   <Typography variant="subtitle1" fontWeight={700} color="text.primary">
//                     Team Members
//                   </Typography>
//                   <Chip 
//                     label={`${inputTeam.length} member${inputTeam.length > 1 ? 's' : ''}`}
//                     size="small"
//                     sx={{ 
//                       bgcolor: '#eff6ff',
//                       color: '#1e40af',
//                       fontWeight: 600
//                     }}
//                   />
//                 </Stack>

//                 {inputTeam.map((pair, idx) => (
//                   <Box 
//                     key={idx} 
//                     sx={{ 
//                       bgcolor: '#fafbfc',
//                       p: 2.5,
//                       borderRadius: 2,
//                       mb: 2,
//                       border: '1px solid #e8e8e8'
//                     }}
//                   >
//                     <Box sx={{ 
//                       display: 'grid', 
//                       gridTemplateColumns: { xs: '1fr', md: '1fr 2fr auto' },
//                       gap: 2,
//                       alignItems: 'center'
//                     }}>
//                       <FormControl fullWidth size="small">
//                         <InputLabel>Role</InputLabel>
//                         <Select
//                           value={pair.role}
//                           label="Role"
//                           onChange={(e) => handleRoleChange(e, idx, e.target.value)}
//                           sx={{ bgcolor: 'white' }}
//                         >
//                           <MenuItem value="">
//                             <em>Select Role</em>
//                           </MenuItem>
//                           {roleAllData.map((role) => (
//                             <MenuItem key={role._id} value={role.role}>
//                               {role.role}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>

//                       <FormControl fullWidth size="small" disabled={!pair.role}>
//                         <InputLabel>Staff Member</InputLabel>
//                         <Select
//                           value={pair.staffId ? JSON.stringify(pair) : ""}
//                           label="Staff Member"
//                           onChange={(e) => handleStaffChange(e, idx)}
//                           renderValue={(selected) => {
//                             if (!selected) return "Select Staff";
//                             const staff = JSON.parse(selected);
//                             return `${staff.staffName || staff.firstName}`;
//                           }}
//                           sx={{ bgcolor: 'white' }}
//                         >
//                           {staffAllData
//                             ?.filter((staff) => staff.role === pair.role)
//                             .map((staff) => {
//                               const running = staff.projectIds?.length || 0;
//                               const isAssistant = staff.role?.toLowerCase() === "assistant";
//                               const limit = isAssistant ? 20 : 10;
//                               const progress = Math.min((running / limit) * 100, 100);
//                               const isOverloaded = running >= limit;

//                               return (
//                                 <MenuItem
//                                   key={staff._id}
//                                   value={JSON.stringify(staff)}
//                                   disabled={isOverloaded}
//                                   sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 1.5,
//                                     opacity: isOverloaded ? 0.6 : 1,
//                                     py: 1.5,
//                                   }}
//                                 >
//                                   <Avatar
//                                     sx={{
//                                       width: 36,
//                                       height: 36,
//                                       bgcolor: "primary.main",
//                                       fontSize: 14,
//                                       fontWeight: 700
//                                     }}
//                                   >
//                                     {staff.firstName?.charAt(0)?.toUpperCase()}
//                                   </Avatar>

//                                   <Box flexGrow={1}>
//                                     <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                                       {staff.firstName} {staff.lastName}
//                                     </Typography>
//                                     <Rating
//                                       name="read-only"
//                                       value={Number(staff.avgRating || 0)}
//                                       precision={0.5}
//                                       readOnly
//                                       size="small"
//                                     />
//                                   </Box>

//                                   <Box position="relative" display="inline-flex">
//                                     <CircularProgress
//                                       variant="determinate"
//                                       value={progress}
//                                       size={36}
//                                       thickness={5}
//                                       sx={{
//                                         color:
//                                           progress < 50
//                                             ? "success.main"
//                                             : progress < 80
//                                             ? "warning.main"
//                                             : "error.main",
//                                       }}
//                                     />
//                                     <Box
//                                       top={0}
//                                       left={0}
//                                       bottom={0}
//                                       right={0}
//                                       position="absolute"
//                                       display="flex"
//                                       alignItems="center"
//                                       justifyContent="center"
//                                     >
//                                       <Typography
//                                         variant="caption"
//                                         component="div"
//                                         sx={{ fontWeight: 700, fontSize: 11 }}
//                                       >
//                                         {running}
//                                       </Typography>
//                                     </Box>
//                                   </Box>
//                                 </MenuItem>
//                               );
//                             })}
//                         </Select>
//                       </FormControl>

//                       {inputTeam.length > 1 && (
//                         <IconButton
//                           onClick={(e) => handleRemovePair(e, idx)}
//                           sx={{
//                             bgcolor: '#fee2e2',
//                             color: '#dc2626',
//                             '&:hover': { 
//                               bgcolor: '#fecaca',
//                               transform: 'scale(1.1)'
//                             },
//                             transition: 'all 0.3s ease'
//                           }}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       )}
//                     </Box>
//                   </Box>
//                 ))}

//                 <Button
//                   variant="outlined"
//                   startIcon={<AddCircleIcon />}
//                   onClick={handleAddMore}
//                   sx={{
//                     mt: 1,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     borderColor: '#3b82f6',
//                     color: '#3b82f6',
//                     '&:hover': {
//                       borderColor: '#2563eb',
//                       bgcolor: '#eff6ff'
//                     }
//                   }}
//                 >
//                   Add Team Member
//                 </Button>
//               </Box>

//               <Divider sx={{ my: 3 }} />

//               {/* Date Selection */}
//               <Box sx={{ 
//                 bgcolor: 'white',
//                 p: 3,
//                 borderRadius: 2,
//                 mb: 3,
//                 border: '1px solid #e8e8e8'
//               }}>
//                 <Typography variant="subtitle1" fontWeight={700} color="text.primary" mb={2.5}>
//                   Project Timeline
//                 </Typography>
//                 <Box sx={{ 
//                   display: 'grid', 
//                   gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
//                   gap: 3
//                 }}>
//                   <Box>
//                     <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
//                       <CalendarTodayIcon sx={{ fontSize: 18, color: '#3b82f6' }} />
//                       <Typography variant="body2" fontWeight={600} color="text.secondary">
//                         Start Date
//                       </Typography>
//                     </Stack>
//                     <DatePicker
//                       ref={datePickerRef}
//                       selected={selectedDate}
//                       onChange={handleDateChange}
//                       dateFormat="dd/MM/yyyy"
//                       className="form-control"
//                       placeholderText="Select start date"
//                       selectsStart
//                       startDate={selectedDate}
//                       endDate={endDate}
//                       style={{
//                         width: '100%',
//                         padding: '12px 16px',
//                         borderRadius: '8px',
//                         border: '2px solid #e0e0e0',
//                         fontSize: '14px'
//                       }}
//                     />
//                   </Box>

//                   <Box>
//                     <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
//                       <CalendarTodayIcon sx={{ fontSize: 18, color: '#3b82f6' }} />
//                       <Typography variant="body2" fontWeight={600} color="text.secondary">
//                         End Date
//                       </Typography>
//                     </Stack>
//                     <DatePicker
//                       selected={endDate}
//                       onChange={handleEndDateChange}
//                       dateFormat="dd/MM/yyyy"
//                       className="form-control"
//                       placeholderText="Select end date"
//                       selectsEnd
//                       startDate={selectedDate}
//                       endDate={endDate}
//                       minDate={selectedDate}
//                       style={{
//                         width: '100%',
//                         padding: '12px 16px',
//                         borderRadius: '8px',
//                         border: '2px solid #e0e0e0',
//                         fontSize: '14px'
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Box>

//               {/* Submit Button */}
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   startIcon={<CheckCircleIcon />}
//                   sx={{
//                     bgcolor: '#10b981',
//                     color: 'white',
//                     px: 4,
//                     py: 1.5,
//                     fontWeight: 700,
//                     fontSize: '15px',
//                     textTransform: 'none',
//                     borderRadius: 2,
//                     boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//                     '&:hover': {
//                       bgcolor: '#059669',
//                       transform: 'translateY(-2px)',
//                       boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)'
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   Create Team
//                 </Button>
//               </Box>
//             </form>
//           </CardContent>
//         </Card>
//       </Container>

//       <style jsx global>{`
//         .react-datepicker-wrapper {
//           width: 100%;
//         }
//         .react-datepicker__input-container input {
//           width: 100%;
//           padding: 12px 16px;
//           border-radius: 8px;
//           border: 2px solid #e0e0e0;
//           fontSize: 14px;
//           transition: all 0.3s ease;
//         }
//         .react-datepicker__input-container input:focus {
//           outline: none;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//         }
//       `}</style>
//     </>
//   );
// };

// export default MakeTeamPage;