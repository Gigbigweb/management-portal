// import React, { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Button, Container, Stack, Typography } from "@mui/material";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import { Url } from "../url/url"; 
// import axios from "axios";
// import { roledata } from '../redux/slice/role'
// import { useNavigate } from 'react-router-dom';
// import {useDispatch} from 'react-redux'
// import Swal from "sweetalert2";


// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// const RolePage = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const roleAllData = useSelector((store) => store.role.data);
//   const [role, setRole]= useState()
//   const [color, setColor]= useState("tranparent")
//   const [deleteLoading, setDeleteLoading]= useState()

//   const formHandle = (e)=>{
//     setColor("green")
//     const roleValue = (e.target.value).toLowerCase() 
//     setRole(roleValue);
//     if((e.target.value).length < 1){
//       setColor("red")
//     }
//   } 
 

//   const deleterole = async (e, id)=>{ 
//     e.preventDefault();
//     setDeleteLoading(true)
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async(result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/role/delete/${id}`)  
//           dispatch(roledata()) 
//           toast.success('Package delete successfully', {
//             position: "top-right",
//             autoClose: 1500,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//           setDeleteLoading(false)
//         } catch (error) {
//           setDeleteLoading(false)
//           toast.error('Something went wrong', {
//             position: "top-right",
//             autoClose: 1500,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             });
//         }  
//       }
//       setDeleteLoading(false)
//     })
//     setDeleteLoading(false)
//   }

//   const addRole = async(e)=>{
//     e.preventDefault();
//     try {
//       if(role){
//         try {
//           await axios.post(`${Url}/role/add`, {role})
//           dispatch(roledata())
//           setRole("")
//           toast.success("New Package Added");   
//         } catch (error) {
//           console.log(error);
//           toast.error("something went wrong");  
//         } 
//       }
//       else{
//         setColor("red")
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//     <ToastContainer />
//       <Helmet>
//         <title> Dashboard: Products | Minimal UI </title>
//       </Helmet>
//       {/* <Container>
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           mb={3}
//         >
//           <Typography variant="h4" gutterBottom>
//             Staff Role
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <form action="">
//           <div className="card p-3">
//             <div className="d-flex justify-content-between ">
//               <div>
//                 <h3 className="text-primary">Add New Role</h3>
//               </div>
//               <div className="d-flex">
//                 <div className="form-group me-3">
//                   <input type="text" name="" id="" value={role} style={{borderColor : color}} onChange={e=>formHandle(e)}  className="form-control" />

//                 </div>
//                 <div>
//                   <button type="submit" onClick={e=>addRole(e)} className="btn btn-primary">Add New Role</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </Container>

//       <Container className=" ">
//         <div className="d-flex align-items-center justify-content-end felx-wrap bg-lightgray rounded-top p-3">
        
//           <div>
//             <div className="d-flex align-items-center ">
//               <p className="mb-0 me-2 ">Total Role : </p>
//               <h4 className="text-primary fw-bold mb-0">
//                 {roleAllData.length}
//               </h4>
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Container>
//         <section className="table-responsive">
//           <table className="table table-striped table-bordered text-center table-hover align-top">
//             <thead className="table-primary">
//               <tr className="align-top">
//                 <th>S. No.</th>
//                 <th>Role</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {roleAllData.map((cv, i) => {
//                 return (
//                   <tr className="text-center" key={i}>
//                     <td>{i + 1}</td>
//                     <td className="">{cv.role}</td>
//                     <td>
//                       <div className="d-flex align-items-center justify-content-center">
                   
//                         <button className="btn border-0 text-danger me-3" onClick={e=>deleterole(e, cv._id)}>
//                         <i className="fa-solid fa-trash fa-sm text-danger"></i> <small>{deleteLoading ? <>deleting</> : <>delete</>} </small>
//                         </button>
                     
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </section>
//       </Container> */}

// <Container>
//   {/* Page Heading */}
//   <div className="d-flex justify-content-between align-items-center mb-4">
//     <h3 className="fw-bold text-dark m-0">👤 Staff Role</h3>
//     <span className="badge bg-success fs-6 px-3 py-2 shadow-sm rounded-3">
//       Total Roles: {roleAllData.length}
//     </span>
//   </div>
// </Container>

// <Container className="mb-4">
//   {/* Add Role Form Card */}
//   <form onSubmit={(e) => addRole(e)}>
//     <div className="card border-0 shadow-sm p-4 rounded-4 role-add-ui">
//       <h5 className="text-primary fw-bold mb-3">➕ Add New Role</h5>
//       <div className="row g-3">
//         <div className="col-md-9">
//           <input
//             type="text"
//             value={role}
//             onChange={(e) => formHandle(e)}
//             className="form-control border-primary"
//             placeholder="Enter role name"
//             style={{ borderColor: color }}
//           />
//         </div>
//         <div className="col-md-3 d-grid">
//           <button type="submit" className="btn btn-primary">
//             <i className="fa fa-plus me-2"></i>Add Role
//           </button>
//         </div>
//       </div>
//     </div>
//   </form>
// </Container>

// <Container>
//   {/* Role Table */}
//   <div className="card border-0 shadow-sm p-3 rounded-4">
//     <div className="table-responsive">
//       <table className="table table-hover table-striped align-middle text-center mb-0">
//         <thead className="table-dark">
//           <tr>
//             <th style={{ width: '10%' }}>S. No.</th>
//             <th style={{ width: '60%' }}>Role</th>
//             <th style={{ width: '30%' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {roleAllData.map((cv, i) => (
//             <tr key={i}>
//               <td>{i + 1}</td>
//               <td className="text-capitalize fw-semibold">{cv.role}</td>
//               <td>
//                 <button
//                   className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 mx-auto"
//                   onClick={(e) => deleterole(e, cv._id)}
//                 >
//                   <i className="fa fa-trash"></i>
//                   {deleteLoading ? 'Deleting...' : 'Delete'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </Container>

//     </>
//   );
// };

// export default RolePage;



// import React, { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { Url } from "../url/url";
// import axios from "axios";
// import { roledata } from '../redux/slice/role';
// import Swal from "sweetalert2";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const RolePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const roleAllData = useSelector((store) => store.role.data);

//   const [role, setRole] = useState("");
//   const [color, setColor] = useState("transparent");
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // 🔸 Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const totalPages = Math.ceil(roleAllData.length / itemsPerPage);
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentRoles = roleAllData.slice(indexOfFirst, indexOfLast);

//   const formHandle = (e) => {
//     const roleValue = e.target.value.toLowerCase();
//     setRole(roleValue);
//     setColor(roleValue.length < 1 ? "red" : "green");
//   };

//   const addRole = async (e) => {
//     e.preventDefault();
//     if (!role) return setColor("red");
//     try {
//       await axios.post(`${Url}/role/add`, { role });
//       dispatch(roledata());
//       setRole("");
//       toast.success("New Role Added");
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   const deleterole = async (e, id) => {
//     e.preventDefault();
//     setDeleteLoading(true);
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "This action is irreversible!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/role/delete/${id}`);
//           dispatch(roledata());
//           toast.success("Role deleted successfully");
//         } catch (err) {
//           toast.error("Something went wrong");
//         }
//       }
//       setDeleteLoading(false);
//     });
//   };

//   const renderPagination = () => {
//     let buttons = [];
//     for (let i = 1; i <= totalPages; i++) {
//       buttons.push(
//         <button
//           key={i}
//           className={`btn btn-sm ${currentPage === i ? "btn-primary" : "btn-outline-primary"} mx-1`}
//           onClick={() => setCurrentPage(i)}
//         >
//           {i}
//         </button>
//       );
//     }
//     return buttons;
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Dashboard: Roles</title>
//       </Helmet>

//       <Container>
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h3 className="fw-bold text-dark m-0">👤 Staff Role</h3>
//           <span className="badge bg-success fs-6 px-3 py-2 shadow-sm rounded-3">
//             Total Roles: {roleAllData.length}
//           </span>
//         </div>
//       </Container>

//       <Container className="mb-4">
//         <form onSubmit={addRole}>
//           <div className="card border-0 shadow-sm p-4 rounded-4 role-add-ui">
//             <h5 className="text-primary fw-bold mb-3">➕ Add New Role</h5>
//             <div className="row g-3">
//               <div className="col-md-9">
//                 <input
//                   type="text"
//                   value={role}
//                   onChange={formHandle}
//                   className="form-control border-primary"
//                   placeholder="Enter role name"
//                   style={{ borderColor: color }}
//                 />
//               </div>
//               <div className="col-md-3 d-grid">
//                 <button type="submit" className="btn btn-primary">
//                   <i className="fa fa-plus me-2"></i>Add Role
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </Container>

//       <Container>
//         <div className="card border-0 shadow-sm p-3 rounded-4">
//           <div className="table-responsive">
//             <table className="table table-hover table-striped align-middle text-center mb-0">
//               <thead className="table-dark">
//                 <tr>
//                   <th style={{ width: '10%' }}>S. No.</th>
//                   <th style={{ width: '60%' }}>Role</th>
//                   <th style={{ width: '30%' }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentRoles.map((cv, i) => (
//                   <tr key={cv._id}>
//                     <td>{indexOfFirst + i + 1}</td>
//                     <td className="text-capitalize fw-semibold">{cv.role}</td>
//                     <td>
//                       <button
//                         className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 mx-auto"
//                         onClick={(e) => deleterole(e, cv._id)}
//                       >
//                         <i className="fa fa-trash"></i>
//                         {deleteLoading ? "Deleting..." : "Delete"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

     
// {totalPages > 1 && (
//   <div className="d-flex justify-content-center align-items-center mt-3">
//     {renderPagination()}
//   </div>
// )}

//         </div>
//       </Container>
//     </>
//   );
// };

// export default RolePage;









import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Url } from "../url/url";
import axios from "axios";
import { roledata } from '../redux/slice/role';
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RolePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleAllData = useSelector((store) => store.role.data);

  // ✅ Permission setup - sessionStorage se directly read
  const permissions = JSON.parse(sessionStorage.getItem('management_permissions') || '{}');
  const perm      = permissions?.staffRole || {};
  const enabled   = perm?.enable === true;
  const canAdd    = perm?.add    === true;
  const canDelete = perm?.delete === true;

  const [role, setRole] = useState("");
  const [color, setColor] = useState("transparent");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // 🔸 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(roleAllData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRoles = roleAllData.slice(indexOfFirst, indexOfLast);

  const formHandle = (e) => {
    const roleValue = e.target.value.toLowerCase();
    setRole(roleValue);
    setColor(roleValue.length < 1 ? "red" : "green");
  };

  const addRole = async (e) => {
    e.preventDefault();
    if (!role) return setColor("red");
    try {
      await axios.post(`${Url}/role/add`, { role });
      dispatch(roledata());
      setRole("");
      toast.success("New Role Added");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const deleterole = async (e, id) => {
    e.preventDefault();
    setDeleteLoading(true);
    Swal.fire({
      title: 'Are you sure?',
      text: "This action is irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${Url}/role/delete/${id}`);
          dispatch(roledata());
          toast.success("Role deleted successfully");
        } catch (err) {
          toast.error("Something went wrong");
        }
      }
      setDeleteLoading(false);
    });
  };

  const renderPagination = () => {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn btn-sm ${currentPage === i ? "btn-primary" : "btn-outline-primary"} mx-1`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
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

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Dashboard: Roles</title>
      </Helmet>

      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-dark m-0">👤 Staff Role</h3>
          <span className="badge bg-success fs-6 px-3 py-2 shadow-sm rounded-3">
            Total Roles: {roleAllData.length}
          </span>
        </div>
      </Container>

      {/* ✅ Add Role form - sirf canAdd pe dikhega */}
      {canAdd && (
        <Container className="mb-4">
          <form onSubmit={addRole}>
            <div className="card border-0 shadow-sm p-4 rounded-4 role-add-ui">
              <h5 className="text-primary fw-bold mb-3">➕ Add New Role</h5>
              <div className="row g-3">
                <div className="col-md-9">
                  <input
                    type="text"
                    value={role}
                    onChange={formHandle}
                    className="form-control border-primary"
                    placeholder="Enter role name"
                    style={{ borderColor: color }}
                  />
                </div>
                <div className="col-md-3 d-grid">
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-plus me-2"></i>Add Role
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Container>
      )}

      <Container>
        <div className="card border-0 shadow-sm p-3 rounded-4">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle text-center mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '10%' }}>S. No.</th>
                  <th style={{ width: canDelete ? '60%' : '90%' }}>Role</th>
                  {/* ✅ Action column - sirf canDelete pe dikhegi */}
                  {canDelete && <th style={{ width: '30%' }}>Action</th>}
                </tr>
              </thead>
              <tbody>
                {currentRoles.map((cv, i) => (
                  <tr key={cv._id}>
                    <td>{indexOfFirst + i + 1}</td>
                    <td className="text-capitalize fw-semibold">{cv.role}</td>
                    {/* ✅ Delete button - sirf canDelete pe dikhega */}
                    {canDelete && (
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 mx-auto"
                          onClick={(e) => deleterole(e, cv._id)}
                        >
                          <i className="fa fa-trash"></i>
                          {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              {renderPagination()}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default RolePage;
