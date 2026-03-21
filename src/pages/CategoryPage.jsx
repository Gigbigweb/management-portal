// import React, { useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { Button, Container, Stack, Typography } from "@mui/material";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// import { Url } from "../url/url"; 
// import axios from "axios";
// import { categorydata } from '../redux/slice/category'
// import { useNavigate } from 'react-router-dom';
// import {useDispatch} from 'react-redux'
// import Swal from "sweetalert2";


// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// const CategoryPage = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const categoryAllData = useSelector((store) => store.category.data);
//   const [category, setCategory]= useState()
//   const [color, setColor]= useState("tranparent")
//   const [deleteLoading, setDeleteLoading]= useState()

//   const formHandle = (e)=>{
//     setColor("green")
//     const categoryValue = (e.target.value).toLowerCase()  
//     setCategory(categoryValue);
//     if((e.target.value).length < 1){
//       setColor("red")
//     }
//   } 
 

//   const deleteCategory = async (e, id)=>{ 
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
//           const hhh = await axios.delete(`${Url}/category/delete/${id}`)  
//           dispatch(categorydata()) 
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

//   const addCategory = async(e)=>{
    
//     e.preventDefault();
//     try {
//       if(category){
//         try {
//           await axios.post(`${Url}/category/add`, {category})
//           dispatch(categorydata())
//           setCategory("")
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
//             Category
//           </Typography>
//         </Stack>
//       </Container>

//       <Container className="mb-4">
//         <form action="">
//           <div className="card p-3">
//             <div className="d-flex justify-content-between ">
//               <div>
//                 <h3 className="text-primary">Add New Category</h3>
//               </div>
//               <div className="d-flex">
//                 <div className="form-group me-3">
//                   <input type="text" name="" id="" value={category} style={{borderColor : color}} onChange={e=>formHandle(e)}  className="form-control" />

//                 </div>
//                 <div>
//                   <button type="submit" onClick={e=>addCategory(e)} className="btn btn-primary">Add New Category</button>
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
//               <p className="mb-0 me-2 ">All Category : </p>
//               <h4 className="text-primary fw-bold mb-0">
//                 {categoryAllData.length}
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
//                 <th>Category</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categoryAllData.map((cv, i) => {
//                 return (
//                   <tr className="text-center" key={i}>
//                     <td>{i + 1}</td>
//                     <td className="">{cv.category}</td>
//                     <td>
//                       <div className="d-flex align-items-center justify-content-center">
             
//                         <button className="btn border-0 text-danger me-3" onClick={e=>deleteCategory(e, cv._id)}>
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

//   <div className="d-flex justify-content-between align-items-center mb-4">
//     <h3 className="fw-bold text-dark m-0">📁 Manage Categories</h3>
//     <span className="badge bg-primary fs-6 px-3 py-2 shadow-sm rounded-3">
//       Total: {categoryAllData.length}
//     </span>
//   </div>


//   <div className="card border-0 shadow-sm mb-4 p-4 category-add-ui rounded-4">
//     <h5 className="text-primary fw-bold mb-3">➕ Add New Category</h5>
//     <form onSubmit={(e) => addCategory(e)}>
//       <div className="row g-2">
//         <div className="col-md-9">
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => formHandle(e)}
//             className="form-control border-primary"
//             placeholder="Enter category name"
//             style={{ borderColor: color }}
//           />
//         </div>
//         <div className="col-md-3 d-grid">
//           <button type="submit" className="btn btn-primary">
//             <i className="fa fa-plus me-2"></i>Add Category
//           </button>
//         </div>
//       </div>
//     </form>
//   </div>

 
//   <div className="card border-0 shadow-sm p-3 category-table-ui rounded-4">
//     <div className="table-responsive">
//       <table className="table table-hover table-striped align-middle text-center mb-0">
//         <thead className="table-dark">
//           <tr>
//             <th style={{ width: '10%' }}>S. No.</th>
//             <th style={{ width: '60%' }}>Category</th>
//             <th style={{ width: '30%' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categoryAllData.map((cv, i) => (
//             <tr key={i}>
//               <td>{i + 1}</td>
//               <td className="text-capitalize fw-semibold">{cv.category}</td>
//               <td>
//                 <button
//                   className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 mx-auto"
//                   onClick={(e) => deleteCategory(e, cv._id)}
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

// export default CategoryPage;





// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import Swal from "sweetalert2";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from "../url/url";
// import { categorydata } from '../redux/slice/category';

// const CategoryPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const categoryAllData = useSelector((store) => store.category.data);
//   const [category, setCategory] = useState("");
//   const [color, setColor] = useState("transparent");
//   const [deleteLoading, setDeleteLoading] = useState(false);


//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   useEffect(() => {
//     dispatch(categorydata());
//   }, [dispatch]);

//   const formHandle = (e) => {
//     const categoryValue = e.target.value.toLowerCase();
//     setCategory(categoryValue);
//     setColor(categoryValue.length > 0 ? "green" : "red");
//   };

//   const addCategory = async (e) => {
//     e.preventDefault();
//     if (!category) return setColor("red");

//     try {
//       await axios.post(`${Url}/category/add`, { category });
      
//       dispatch(categorydata());
//       setCategory("");
//       toast.success("New Category Added");
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const deleteCategory = async (e, id) => {
//     e.preventDefault();
//     setDeleteLoading(true);

//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/category/delete/${id}`);
//           dispatch(categorydata());
//           toast.success('Category deleted successfully');
//         } catch (error) {
//           toast.error('Something went wrong');
//         }
//       }
//       setDeleteLoading(false);
//     });
//   };

//   // Pagination logic
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentCategories = categoryAllData.slice(indexOfFirst, indexOfLast);
//   const totalPages = itemsPerPage > 0 ? Math.ceil(categoryAllData.length / itemsPerPage) : 1;


//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Dashboard: Category | Minimal UI </title>
//       </Helmet>

//       <Container>
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h3 className="fw-bold text-dark m-0">📁 Manage Categories</h3>
//           <span className="badge bg-primary fs-6 px-3 py-2 shadow-sm rounded-3">
//             Total: {categoryAllData.length}
//           </span>
//         </div>

//         <div className="card border-0 shadow-sm mb-4 p-4 category-add-ui rounded-4">
//           <h5 className="text-primary fw-bold mb-3">➕ Add New Category</h5>
//           <form onSubmit={addCategory}>
//             <div className="row g-2">
//               <div className="col-md-9">
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={formHandle}
//                   className="form-control border-primary"
//                   placeholder="Enter category name"
//                   style={{ borderColor: color }}
//                 />
//               </div>
//               <div className="col-md-3 d-grid">
//                 <button type="submit" className="btn btn-primary">
//                   <i className="fa fa-plus me-2"></i>Add Category
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         <div className="card border-0 shadow-sm p-3 category-table-ui rounded-4">
//           <div className="table-responsive">
//             <table className="table table-hover table-striped align-middle text-center mb-0">
//               <thead className="table-dark">
//                 <tr>
//                   <th style={{ width: '10%' }}>S. No.</th>
//                   <th style={{ width: '60%' }}>Category</th>
//                   <th style={{ width: '30%' }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentCategories.map((cv, i) => (
//                   <tr key={i}>
//                     <td>{indexOfFirst + i + 1}</td>
//                     <td className="text-capitalize fw-semibold">{cv.category}</td>
//                     <td>
//                       <button
//                         className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 mx-auto"
//                         onClick={(e) => deleteCategory(e, cv._id)}
//                       >
//                         <i className="fa fa-trash"></i>
//                         {deleteLoading ? 'Deleting...' : 'Delete'}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination Controls */}
//           {/* Pagination Controls */}
// {totalPages > 1 && (
//   <nav className="mt-3">
//     <ul className="pagination justify-content-center">
//       {[...Array(totalPages)].map((_, idx) => (
//         <li
//           key={idx}
//           className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
//           onClick={() => handlePageChange(idx + 1)}
//           style={{ cursor: "pointer" }}
//         >
//           <span className="page-link">{idx + 1}</span>
//         </li>
//       ))}
//     </ul>
//   </nav>
// )}

//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default CategoryPage;




// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
// import { Container } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import Swal from "sweetalert2";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Url } from "../url/url";
// import { categorydata } from '../redux/slice/category';

// const CategoryPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const categoryAllData = useSelector((store) => store.category.data);

//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null); // ✅ image state
//   const [color, setColor] = useState("transparent");
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   useEffect(() => {
//     dispatch(categorydata());
//   }, [dispatch]);

//   const formHandle = (e) => {
//     const categoryValue = e.target.value.toLowerCase();
//     setCategory(categoryValue);
//     setColor(categoryValue.length > 0 ? "green" : "red");
//   };

//   const addCategory = async (e) => {
//     e.preventDefault();
//     if (!category || !image) return setColor("red");

//     try {
//       const formData = new FormData();
//       formData.append("category", category);
//       formData.append("image", image);

//       await axios.post(`${Url}/category/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       dispatch(categorydata());
//       setCategory("");
//       setImage(null);
//       toast.success("New Category Added");
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   const deleteCategory = async (e, id) => {
//     e.preventDefault();
//     setDeleteLoading(true);

//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/category/delete/${id}`);
//           dispatch(categorydata());
//           toast.success('Category deleted successfully');
//         } catch (error) {
//           toast.error('Something went wrong');
//         }
//       }
//       setDeleteLoading(false);
//     });
//   };

//   // Pagination logic
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentCategories = categoryAllData.slice(indexOfFirst, indexOfLast);
//   const totalPages = itemsPerPage > 0 ? Math.ceil(categoryAllData.length / itemsPerPage) : 1;

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title> Dashboard: Category | Minimal UI </title>
//       </Helmet>

//       <Container>
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h3 className="fw-bold text-dark m-0">📁 Manage Categories</h3>
//           <span className="badge bg-primary fs-6 px-3 py-2 shadow-sm rounded-3">
//             Total: {categoryAllData.length}
//           </span>
//         </div>

//         <div className="card border-0 shadow-sm mb-4 p-4 category-add-ui rounded-4">
//           <h5 className="text-primary fw-bold mb-3">➕ Add New Category</h5>
//           <form onSubmit={addCategory}>
//             <div className="row g-2">
//               <div className="col-md-5">
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={formHandle}
//                   className="form-control border-primary"
//                   placeholder="Enter category name"
//                   style={{ borderColor: color }}
//                 />
//               </div>

//               <div className="col-md-5">
//                 <input
//                   type="file"
//                   className="form-control border-primary"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   accept="image/*"
//                 />
//               </div>

//               <div className="col-md-2 d-grid">
//                 <button type="submit" className="btn btn-primary">
//                   <i className="fa fa-plus me-2"></i>Add Category
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         <div className="card border-0 shadow-sm p-3 category-table-ui rounded-4">
//           <div className="table-responsive">
//             <table className="table table-hover table-striped align-middle text-center mb-0">
//               <thead className="table-dark">
//                 <tr>
//                   <th style={{ width: '10%' }}>S. No.</th>
//                   <th style={{ width: '50%' }}>Category</th>
//                   <th style={{ width: '20%' }}>Image</th>
//                   <th style={{ width: '20%' }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentCategories.map((cv, i) => (
//                   <tr key={i}>
//                     <td>{indexOfFirst + i + 1}</td>
//                     <td className="text-capitalize fw-semibold">{cv.category}</td>
//                     <td>
//                       {cv.image && (
//                         <img src={cv.image} alt={cv.category} style={{ width: '50px', borderRadius: '4px' }} />
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-2 mx-auto"
//                         onClick={(e) => deleteCategory(e, cv._id)}
//                       >
//                         <i className="fa fa-trash"></i>
//                         {deleteLoading ? 'Deleting...' : 'Delete'}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {totalPages > 1 && (
//               <nav className="mt-3">
//                 <ul className="pagination justify-content-center">
//                   {[...Array(totalPages)].map((_, idx) => (
//                     <li
//                       key={idx}
//                       className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
//                       onClick={() => handlePageChange(idx + 1)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <span className="page-link">{idx + 1}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             )}

//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default CategoryPage;



import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../url/url";
import { categorydata } from "../redux/slice/category";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categoryAllData = useSelector((store) => store.category.data);

  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(categorydata());
  }, [dispatch]);

  const formHandle = (e) => {
    setCategory(e.target.value);
  };

  const addCategory = async (e) => {
    e.preventDefault();
    if (!category || !image) return toast.error("Please fill all fields!");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("image", image);

      await axios.post(`${Url}/category/add`, formData);

      toast.success("✅ Category Added Successfully!");

      setCategory("");
      setImage(null);
      document.getElementById("fileInput").value = null;

      dispatch(categorydata());
    } catch (error) {
      toast.error("❌ Something went wrong!");
    }

    setLoading(false);
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    setDeleteLoading(id);

    try {
      await axios.delete(`${Url}/category/delete/${id}`);
      toast.success("✅ Category Deleted!");
      dispatch(categorydata());
    } catch (error) {
      toast.error("❌ Something went wrong!");
    }

    setDeleteLoading(null);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCategories = categoryAllData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(categoryAllData.length / itemsPerPage);

  return (
    <>
      <ToastContainer />
      <Helmet><title>Dashboard: Category</title></Helmet>

      <Container>
        <h3 className="fw-bold text-dark mb-3">📁 Manage Categories</h3>

        <div className="card p-4 shadow-sm mb-4 rounded-4">
          <h5 className="fw-bold text-primary mb-3">➕ Add Category</h5>
          <form onSubmit={addCategory}>
            <div className="row g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  value={category}
                  onChange={formHandle}
                  className="form-control"
                  placeholder="Category Name"
                />
              </div>

              <div className="col-md-5">
                <input
                  type="file"
                  id="fileInput"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                />
              </div>

              <div className="col-md-2 d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span>
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="card shadow-sm p-3 rounded-4">
          <table className="table align-middle text-center table-hover">
            <thead className="table-dark">
              <tr>
                <th>S No</th>
                <th>Category</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.map((cv, i) => (
                <tr key={cv._id}>
                  <td>{indexOfFirst + i + 1}</td>
                  <td className="text-capitalize fw-semibold">{cv.category}</td>
                  <td>
                    {cv.image && (
                      <img src={cv.image} alt="img" width="50" className="rounded" />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteCategory(cv._id)}
                      disabled={deleteLoading === cv._id}
                    >
                      {deleteLoading === cv._id ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <ul className="pagination justify-content-center mt-3">
            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(idx + 1)}
                style={{ cursor: "pointer" }}
              >
                <span className="page-link">{idx + 1}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default CategoryPage;
