// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Url } from "src/url/url";

// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
// } from "@mui/material";

// const SubCategory = () => {
//   const [subcategory, setSubcategory] = useState("");
//   const [data, setData] = useState([]);

//   // For Editing
//   const [editId, setEditId] = useState("");
//   const [editValue, setEditValue] = useState("");

//   // MUI Modal State
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const getData = async () => {
//     try {
//       const res = await axios.get(`${Url}/subcategory/getsubcategory`);
//       setData(res.data.data);
//     } catch (error) {
//       Swal.fire("Error!", "Failed to load data!", "error");
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const addSubcategory = async (e) => {
//     e.preventDefault();

//     if (!subcategory) {
//       return Swal.fire("Warning!", "Please enter subcategory!", "warning");
//     }

//     try {
//       await axios.post(`${Url}/subcategory/create`, { subcategory });
//       Swal.fire("Success!", "Subcategory Added!", "success");
//       setSubcategory("");
//       getData();
//     } catch (error) {
//       Swal.fire("Error!", "Failed to add!", "error");
//     }
//   };

//   // DELETE
//   const deleteSub = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will be deleted permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/subcategory/delete/${id}`);
//           Swal.fire("Deleted!", "Subcategory removed.", "success");
//           getData();
//         } catch (error) {
//           Swal.fire("Error!", "Delete failed!", "error");
//         }
//       }
//     });
//   };

//   // OPEN EDIT MODAL
//   const openEditModal = (item) => {
//     setEditId(item._id);
//     setEditValue(item.subcategory);
//     handleOpen();
//   };

//   // UPDATE
//   const updateSub = async () => {
//     if (!editValue) {
//       return Swal.fire("Warning!", "Field cannot be empty!", "warning");
//     }

//     try {
//       await axios.put(`${Url}/subcategory/update/${editId}`, {
//         subcategory: editValue,
//       });

//       Swal.fire("Updated!", "Subcategory updated successfully!", "success");
//       handleClose();
//       getData();
//     } catch (error) {
//       Swal.fire("Error!", "Update failed!", "error");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3 className="fw-bold">Manage Subcategory</h3>

//       {/* ADD FORM */}
//       <div className="card p-3 mt-3 shadow-sm">
//         <form onSubmit={addSubcategory}>
//           <div className="row g-2">
//             <div className="col-md-8">
//               <input
//                 type="text"
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//                 placeholder="Enter SubCategory"
//                 className="form-control"
//               />
//             </div>
//             <div className="col-md-4 d-grid">
//               <button className="btn btn-primary">Add</button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* TABLE */}
//       <div className="card p-3 mt-4 shadow-sm">
//         <table className="table text-center">
//           <thead className="table-dark">
//             <tr>
//               <th>S No</th>
//               <th>SubCategory</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((cv, idx) => (
//               <tr key={cv._id}>
//                 <td>{idx + 1}</td>
//                 <td>{cv.subcategory}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-warning me-2"
//                     onClick={() => openEditModal(cv)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => deleteSub(cv._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MUI EDIT MODAL */}
//      <Modal open={open} onClose={handleClose}>
//   <Box
//     sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 400,
//       bgcolor: "background.paper",
//       boxShadow: 24,
//       p: 4,
//       borderRadius: 2,
//       position: "relative",
//     }}
//   >
//     {/* CLOSE BUTTON */}
//     <Box
//       onClick={handleClose}
//       sx={{
//         position: "absolute",
//         top: 10,
//         right: 10,
//         cursor: "pointer",
//         fontSize: "20px",
//         fontWeight: "bold",
//         color: "#555",
//         "&:hover": { color: "black" },
//       }}
//     >
//       ✕
//     </Box>

//     <Typography variant="h6" className="fw-bold mb-3">
//       Edit Subcategory
//     </Typography>

//     <TextField
//       fullWidth
//       label="Subcategory"
//       value={editValue}
//       onChange={(e) => setEditValue(e.target.value)}
//       sx={{ mb: 2 }}
//     />

//     <Button variant="contained" fullWidth onClick={updateSub}>
//       Update
//     </Button>
//   </Box>
// </Modal>

//     </div>
//   );
// };

// export default SubCategory;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Url } from "src/url/url";

// import {
//   Modal,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { useSelector } from "react-redux";

// const SubCategory = () => {
//   const [subcategory, setSubcategory] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [categories, setCategories] = useState([]);
//     const categoryAllData = useSelector((store) => store.category.data);
  

//   const [data, setData] = useState([]);

//   // For Editing
//   const [editId, setEditId] = useState("");
//   const [editValue, setEditValue] = useState("");
//   const [editCategory, setEditCategory] = useState("");

//   // MUI Modal State
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // Fetch All Categories
//   // const getCategories = async () => {
//   //   const res = await axios.get(`${Url}/category/getcategory`);
//   //   setCategories(res.data.data);
//   // };

//   // Fetch All Subcategories
//   const getData = async () => {
//     try {
//       const res = await axios.get(`${Url}/subcategory/getsubcategory`);
//       setData(res.data.data);
//     } catch (error) {
//       Swal.fire("Error!", "Failed to load data!", "error");
//     }
//   };

//   useEffect(() => {
//     getData();
//     // getCategories();
//   }, []);


//   // ADD SUBCATEGORY
//   const addSubcategory = async (e) => {
//     e.preventDefault();

//     if (!subcategory || !categoryId) {
//       return Swal.fire("Warning!", "Please fill all fields!", "warning");
//     }

//     try {
//       await axios.post(`${Url}/subcategory/create`, { subcategory, categoryId });

//       Swal.fire("Success!", "Subcategory Added!", "success");

//       setSubcategory("");
//       setCategoryId("");
//       getData();
//     } catch (error) {
//       Swal.fire("Error!", "Failed to add!", "error");
//     }
//   };


//   // DELETE
//   const deleteSub = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This will be deleted permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Delete",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${Url}/subcategory/delete/${id}`);
//           Swal.fire("Deleted!", "Subcategory removed.", "success");
//           getData();
//         } catch (error) {
//           Swal.fire("Error!", "Delete failed!", "error");
//         }
//       }
//     });
//   };


//   // OPEN EDIT MODAL
//   const openEditModal = (item) => {
//     setEditId(item._id);
//     setEditValue(item.subcategory);
//     setEditCategory(item.categoryId?._id);
//     handleOpen();
//   };


//   // UPDATE SUBCATEGORY
//   const updateSub = async () => {
//     if (!editValue || !editCategory) {
//       return Swal.fire("Warning!", "All fields are required!", "warning");
//     }

//     try {
//       await axios.put(`${Url}/subcategory/update/${editId}`, {
//         subcategory: editValue,
//         categoryId: editCategory,
//       });

//       Swal.fire("Updated!", "Subcategory updated successfully!", "success");
//       handleClose();
//       getData();
//     } catch (error) {
//       Swal.fire("Error!", "Update failed!", "error");
//     }
//   };


//   return (
//     <div className="container mt-4">
//       <h3 className="fw-bold">Manage Subcategory</h3>

//       {/* ADD FORM */}
//       <div className="card p-3 mt-3 shadow-sm">
//         <form onSubmit={addSubcategory}>
//           <div className="row g-2">

//                     <div className="col-md-4">
//               <select
//                 className="form-select"
//                 value={categoryId}
//                 onChange={(e) => setCategoryId(e.target.value)}
//               >
//                 <option value="">Select Category</option>
//                 {categoryAllData.map((cat) => (
//                   <option value={cat._id} key={cat._id}>
//                     {cat.category}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Subcategory input */}
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 value={subcategory}
//                 onChange={(e) => setSubcategory(e.target.value)}
//                 placeholder="Enter SubCategory"
//                 className="form-control"
//               />
//             </div>

//             {/* Category dropdown */}
    

//             <div className="col-md-4 d-grid">
//               <button className="btn btn-primary">Add</button>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* TABLE */}
//       <div className="card p-3 mt-4 shadow-sm">
//         <table className="table text-center">
//           <thead className="table-dark">
//             <tr>
//               <th>S No</th>
//               <th>Category</th>
//               <th>SubCategory</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.map((cv, idx) => (
//               <tr key={cv._id}>
//                 <td>{idx + 1}</td>
//                 <td>{cv.categoryId?.category}</td>
//                 <td>{cv.subcategory}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-warning me-2"
//                     onClick={() => openEditModal(cv)}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => deleteSub(cv._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MUI EDIT MODAL */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 420,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 3,
//             position: "relative",
//           }}
//         >

//           {/* CLOSE BUTTON */}
//           <Box
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               cursor: "pointer",
//               fontSize: "22px",
//               fontWeight: "bold",
//               color: "#555",
//               "&:hover": { color: "black" },
//             }}
//           >
//             ✕
//           </Box>

//           <Typography variant="h6" className="fw-bold mb-3">
//             Edit Subcategory
//           </Typography>

//           {/* Edit Subcategory */}
//           <TextField
//             fullWidth
//             label="Subcategory"
//             value={editValue}
//             onChange={(e) => setEditValue(e.target.value)}
//             sx={{ mb: 2 }}
//           />

//           {/* Edit Category */}
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Select Category</InputLabel>
//             <Select
//               value={editCategory}
//               label="Select Category"
//               onChange={(e) => setEditCategory(e.target.value)}
//             >
//            {categoryAllData.map((cat) => (
//   <MenuItem value={cat._id} key={cat._id}>
//     {cat.category}
//   </MenuItem>
// ))}

//             </Select>
//           </FormControl>

//           <Button variant="contained" fullWidth onClick={updateSub}>
//             Update
//           </Button>

//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default SubCategory;












import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Url } from "src/url/url";
import { Container } from "@mui/material";
import {
  Modal, Box, Typography, TextField,
  Button, MenuItem, Select, FormControl, InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";

const SubCategory = () => {
  const [subcategory, setSubcategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [open, setOpen] = useState(false);

  const categoryAllData = useSelector((store) => store.category.data);

  // ── Permissions ─────────────────────────────────────────────
  const permissions = JSON.parse(sessionStorage.getItem('management_permissions') || '{}')
  const perm      = permissions?.subcategory || {}
  const enabled   = perm?.enable === true
  const canView   = perm?.view   === true
  const canAdd    = perm?.add    === true
  const canEdit   = perm?.edit   === true
  const canDelete = perm?.delete === true

  const getData = async () => {
    try {
      const res = await axios.get(`${Url}/subcategory/getsubcategory`);
      setData(res.data.data);
    } catch (error) {
      Swal.fire("Error!", "Failed to load data!", "error");
    }
  };

  useEffect(() => { getData(); }, []);

  const addSubcategory = async (e) => {
    e.preventDefault();
    if (!subcategory || !categoryId) {
      return Swal.fire("Warning!", "Please fill all fields!", "warning");
    }
    try {
      await axios.post(`${Url}/subcategory/create`, { subcategory, categoryId });
      Swal.fire("Success!", "Subcategory Added!", "success");
      setSubcategory("");
      setCategoryId("");
      getData();
    } catch (error) {
      Swal.fire("Error!", "Failed to add!", "error");
    }
  };

  const deleteSub = async (id) => {
    Swal.fire({
      title: "Are you sure?", text: "This will be deleted permanently!",
      icon: "warning", showCancelButton: true, confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${Url}/subcategory/delete/${id}`);
          Swal.fire("Deleted!", "Subcategory removed.", "success");
          getData();
        } catch (error) {
          Swal.fire("Error!", "Delete failed!", "error");
        }
      }
    });
  };

  const openEditModal = (item) => {
    setEditId(item._id);
    setEditValue(item.subcategory);
    setEditCategory(item.categoryId?._id);
    setOpen(true);
  };

  const updateSub = async () => {
    if (!editValue || !editCategory) {
      return Swal.fire("Warning!", "All fields are required!", "warning");
    }
    try {
      await axios.put(`${Url}/subcategory/update/${editId}`, {
        subcategory: editValue, categoryId: editCategory,
      });
      Swal.fire("Updated!", "Subcategory updated successfully!", "success");
      setOpen(false);
      getData();
    } catch (error) {
      Swal.fire("Error!", "Update failed!", "error");
    }
  };

  // ── Access Denied ────────────────────────────────────────────
  if (!enabled) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
          <div style={{ fontSize: 50 }}>🔒</div>
          <h4 style={{ marginTop: 16, color: '#1e293b' }}>Access Denied</h4>
          <p>Aapke paas is page ka access nahi hai.</p>
        </div>
      </Container>
    )
  }

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Manage Subcategory</h3>

      {/* ADD FORM — canAdd */}
      {canAdd && (
        <div className="card p-3 mt-3 shadow-sm">
          <form onSubmit={addSubcategory}>
            <div className="row g-2">
              <div className="col-md-4">
                <select className="form-select" value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}>
                  <option value="">Select Category</option>
                  {categoryAllData.map((cat) => (
                    <option value={cat._id} key={cat._id}>{cat.category}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <input type="text" value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="Enter SubCategory" className="form-control" />
              </div>
              <div className="col-md-4 d-grid">
                <button className="btn btn-primary">Add</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="card p-3 mt-4 shadow-sm">
        <table className="table text-center">
          <thead className="table-dark">
            <tr>
              <th>S No</th>
              <th>Category</th>
              <th>SubCategory</th>
              {(canEdit || canDelete) && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={canEdit || canDelete ? 4 : 3} className="text-muted py-4">
                  No subcategories found.
                </td>
              </tr>
            ) : data.map((cv, idx) => (
              <tr key={cv._id}>
                <td>{idx + 1}</td>
                <td>{cv.categoryId?.category}</td>
                <td>{cv.subcategory}</td>
                {(canEdit || canDelete) && (
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      {/* Edit — canEdit */}
                      {canEdit && (
                        <button className="btn btn-sm btn-warning"
                          onClick={() => openEditModal(cv)}>
                          Edit
                        </button>
                      )}
                      {/* Delete — canDelete */}
                      {canDelete && (
                        <button className="btn btn-sm btn-danger"
                          onClick={() => deleteSub(cv._id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL — canEdit */}
      {canEdit && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420, bgcolor: "background.paper",
            boxShadow: 24, p: 4, borderRadius: 3,
          }}>
            <Box onClick={() => setOpen(false)} sx={{
              position: "absolute", top: 10, right: 10,
              cursor: "pointer", fontSize: "22px", fontWeight: "bold",
              color: "#555", "&:hover": { color: "black" },
            }}>✕</Box>

            <Typography variant="h6" className="fw-bold mb-3">
              Edit Subcategory
            </Typography>

            <TextField fullWidth label="Subcategory" value={editValue}
              onChange={(e) => setEditValue(e.target.value)} sx={{ mb: 2 }} />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Category</InputLabel>
              <Select value={editCategory} label="Select Category"
                onChange={(e) => setEditCategory(e.target.value)}>
                {categoryAllData.map((cat) => (
                  <MenuItem value={cat._id} key={cat._id}>{cat.category}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" fullWidth onClick={updateSub}>
              Update
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default SubCategory;

