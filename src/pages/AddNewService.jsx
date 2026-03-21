// import React, {useEffect, useState} from 'react'
// import { Helmet } from 'react-helmet-async';  
// import {useDispatch, useSelector} from 'react-redux'
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
//   import 'react-quill/dist/quill.snow.css'; // import styles
// import ReactQuill from 'react-quill'; // import Quill


// import { Url } from '../url/url';
// import { Container } from '@mui/material';
// import axios from "axios"; 
// import { servicedata } from 'src/redux/slice/service';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';


// const AddNewService = () => {  
//     const allCategory = useSelector(store => store.category.data) 
//     const allPackage = useSelector(store => store.package.data) 
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false) 
//   const [formValue, setFormValue] = useState({}) 
//   const [categoryArr, setCategoryArr] = useState([])
//   const [packageArr, setPackageArr] = useState([])
//   const [categoryErrMsg, setCategoryErrMsg] = useState()
//   const [packageErrMsg, setPackageErrMsg] = useState()
//   const [fileValue, setFileValue] = useState()
//   const [editorHtml, setEditorHtml] = useState('');
// const [subcategories, setSubcategories] = useState([]);
// const [filteredSub, setFilteredSub] = useState([]);

//   const handleEditorChange = (descriptionHtml) => { 
//     setEditorHtml(descriptionHtml);
//   }
 
//   const formHandle = (e)=>{
//     const key = e.target.name
//     const value = e.target.value 
//     const lowerValue = value.toLowerCase()
//     setFormValue({...formValue, [key]:lowerValue}) 
//   }

//   const filehandle = (e)=>{
//     const file = e.target.files[0]
//     const name = e.target.name
//     setFileValue({...fileValue, [name]:file})
// }

//   const submit = async(e)=>{
//     e.preventDefault()
//     console.log("editorHtml", editorHtml);
//     setLoading(true)  
//     setCategoryErrMsg("") 
//     const {serviceName, price, discountPrice, offer, category,subcategory } = formValue
//     if(serviceName && price && discountPrice && offer && editorHtml ){  
//     if(!category){
//         setLoading(false)
//         return setCategoryErrMsg("Choose atleat one Category")  
//     }
//     if(packageArr.length < 1){
//         setLoading(false)
//         return setPackageErrMsg("Choose atleat one Package")  
//     }

//     try { 
//       const formData = new FormData()
//       // formData.append("category", [...categoryArr]) 
//       formData.append("category", formValue.category) 
//       formData.append("subcategory", formValue.subcategory);

//       formData.append("package", [...packageArr])
//       formData.append("serviceName", formValue.serviceName) 
//       formData.append("price", formValue.price) 
//       formData.append("discountPrice", formValue.discountPrice) 
//       formData.append("offer", formValue.offer) 
//       // formData.append("description", formValue.description) 
//       formData.append("description", editorHtml) 
//       // formData.append("pricePerDay", formValue.pricePerDay)  
//       formData.append("image", fileValue.image)  


//       await axios.post(`${Url}/service/add`, formData) 
//       await dispatch(servicedata()) 
//       setLoading(false)
//       Swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'New Service Added',
//         showConfirmButton: false,
//         timer: 1500
//       })
//       navigate('/dashboard/service') 

//     } catch (error) {
//       console.log(error);
//       setLoading(false)
//       toast.error("something wend wrong");
//     }  
//     }
//     else{
//         setLoading(false) 
//         toast.error("All fields are required");
//     }
//   }
  
//   const categoryAddFunc = (e)=>{
//     setCategoryErrMsg("")
//     const {value, checked} = e.target  
//     if(checked){
//         setCategoryArr([...categoryArr, value])
//     }
//     else{
//         setCategoryArr(categoryArr.filter((e)=>e !== value))
//     } 
//   }
  
//   const packageAddFunc = (e)=>{
//     const {value, checked} = e.target  
//     if(checked){
//         setPackageArr([...packageArr, value])
//     }
//     else{
//         setPackageArr(packageArr.filter((e)=>e !== value))
//     } 
//   }

// const handleCategoryChange = (e) => {
//   formHandle(e); // old function
//   const catId = e.target.value;

//   const related = subcategories.filter(sub => sub.categoryId._id === catId);
//   setFilteredSub(related);
// };

// useEffect(() => {
//   axios.get(`${Url}/subcategory/getsubcategory`)
//     .then(res => setSubcategories(res.data.data))
//     .catch(err => console.log(err));
// }, []);


//   return (
//     <>
//     <ToastContainer />
//     <Helmet>
//         <title> Teamlans | Service </title>
//     </Helmet> 
//     <Container className='card bg-white rounded border p-3'>
//       <section>
//         <form className="form">
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Service Name</label>
//                 <input type="text" name="serviceName" placeholder='Enter the Package Name' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)} />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Service Image</label>
//                 <input type="file" name="image" placeholder='Enter the Package Name' className='form-control addpackageinput' id="" onChange={e=>filehandle(e)} />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Price  (&#x24;) </label>
//                 <input type="text" name="price" placeholder='Price' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Discount Price ($)</label>
//                 <input type="text" name="discountPrice" placeholder='Discount Price' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Extra Offer (%)</label>
//                 <input type="text" name="offer" placeholder='Offer' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>  
//             {/* <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Price Per Day ($)</label>
//                 <input type="text" name="pricePerDay" placeholder='pricePerDay' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>   */}

//             {/* <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">

//                 <label htmlFor="" className='me-2'>Category</label>
//                 <small><small className='text-danger'>{categoryErrMsg}</small></small>
//                 <div className="d-flex flex-wrap align-items-center"> 
//                 {allCategory && allCategory.map((item, i)=>{
//                     return ( 
//                         <div className='d-flex align-item-center me-3'>
//                             <input type="checkbox" label="hello" name="" id="" onChange={e=>categoryAddFunc(e)} value={item._id} className='me-1 '/>
//                             <span>{item.category}</span>
//                             <label htmlFor="category"></label>
//                         </div>
//                     )
//                 })}
//                 </div>
//               </div>
//             </div>     */}
//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">


//                 <label htmlFor="" className='me-2'>Category</label>
//                 {/* <select name="category" id="" onChange={e=>formHandle(e)} className='form-select addpackageinput'>
//                   <option disabled={formValue.category}>Choose</option>
//                   {allCategory && allCategory.map((categoryData, categorIndex)=>{
//                     return(
//                       <option value={categoryData._id} key={categorIndex}>{categoryData.category}</option>
//                     )
//                   })}
//                 </select> */}

//                 <select
//   name="category"
//   className="form-select addpackageinput"
//   onChange={handleCategoryChange}
// >
//   <option>Choose Category</option>
//   {allCategory.map(cat => (
//     <option key={cat._id} value={cat._id}>
//       {cat.category}
//     </option>
//   ))}
// </select>

//                 <small><small className='text-danger'>{categoryErrMsg}</small></small> 
//               </div>
//             </div>    
// <div className="col-lg-6 col-md-6 col-12 mb-3">
//   <div className="form-group">
//     <label htmlFor="">Subcategory</label>

//     <select
//       name="subcategory"
//       className="form-select addpackageinput"
//       onChange={formHandle}
//     >
//       <option>Choose Subcategory</option>

//       {filteredSub.map(sub => (
//         <option key={sub._id} value={sub._id}>
//           {sub.subcategory}
//         </option>
//       ))}
//     </select>
//   </div>
// </div>

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Package</label>
//                 <small><small className='text-danger'>{packageErrMsg}</small></small>
//                 <div className="d-flex flex-wrap align-items-center"> 
//                 {allPackage && allPackage.map((item, i)=>{
//                     return ( 
//                         <div className='d-flex align-item-center me-3'>
//                             <input type="checkbox" label="hello" name="" id="" onChange={e=>packageAddFunc(e)} value={item._id} className='me-1 '/>
//                             <span>{item.packageName}</span> 
//                         </div>
//                     )
//                 })}
//                 </div>
//               </div>
//             </div>   

//             {/* <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="" className='mb-1'>About Service</label>   
//                 <textarea name="description"   onChange={e=>formHandle(e)} className='form-control' placeholder='write something about package' rows="4"></textarea> 
//               </div>
//             </div>  */}
//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="" className='mb-1'>About Service </label>   
//                 <ReactQuill
//                   value={editorHtml}
//                   onChange={e=>handleEditorChange(e)}
//                   placeholder="Write something..."
//                   name="editor"
//                 />
//               </div>
//             </div> 

//             <div className="col-12 mb-2">
//               <button type='submit' onClick={e=>submit(e)} disabled={loading} className='btn btn-primary border shadow '>{loading ? <>  Adding...</> : <> Add </>}</button>
//             </div>


 
//           </div> 
//         </form>
//       </section>
//     </Container> 
//     </>
//   )
// }
// export default AddNewService





// src/pages/AddNewService.jsx  (ya jahan tumhara component hai)
// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import { Url } from '../url/url';
// import { Container } from '@mui/material';
// import axios from 'axios';
// import { servicedata } from 'src/redux/slice/service';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const AddNewService = () => {
//   const allCategory = useSelector(store => store.category.data) || [];
//   const allPackage = useSelector(store => store.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [packageArr, setPackageArr] = useState([]);
//   const [categoryErrMsg, setCategoryErrMsg] = useState('');
//   const [packageErrMsg, setPackageErrMsg] = useState('');
//   const [fileValue, setFileValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState('');
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);
//   const [deliverableInput, setDeliverableInput] = useState('');
//   const [deliverables, setDeliverables] = useState([]);
//   const [rating, setRating] = useState('');
//   const [timeline, setTimeline] = useState('');

//   useEffect(() => {
//     // load all subcategories once
//     axios.get(`${Url}/subcategory/getsubcategory`)
//       .then(res => {
//         // ensure res.data.data is an array
//         const arr = (res.data && res.data.data) ? res.data.data : [];
//         setSubcategories(arr);
//       })
//       .catch(err => {
//         console.error('get subcategories error', err);
//       });
//   }, []);

//   const handleEditorChange = (descriptionHtml) => {
//     setEditorHtml(descriptionHtml);
//   };

//   // IMPORTANT: don't lowercase IDs (category/subcategory). Only transform regular text fields if you want.
//   const formHandle = (e) => {
//     const key = e.target.name;
//     const value = e.target.value;

//     // if field is category/subcategory (IDs) keep as-is
//     if (key === 'category' || key === 'subcategory') {
//       setFormValue(prev => ({ ...prev, [key]: value }));
//       return;
//     }
//     // Otherwise store lowercase string (optional)
//     setFormValue(prev => ({ ...prev, [key]: typeof value === 'string' ? value.toLowerCase() : value }));
//   };

//   const filehandle = (e) => {
//     const file = e.target.files[0];
//     const name = e.target.name;
//     setFileValue(prev => ({ ...prev, [name]: file }));
//   };

//   // package checkbox add/remove
//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setPackageArr(prev => [...prev, value]);
//     } else {
//       setPackageArr(prev => prev.filter(p => p !== value));
//     }
//   };

//   // Category change -> filter subcategories
//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     // set category in form
//     setFormValue(prev => ({ ...prev, category: catId }));

//     // filter subcat by categoryId (note: sub.categoryId may be populated object or string id)
//     const related = subcategories.filter(sub => {
//       if (!sub.categoryId) return false;
//       // sub.categoryId might be object or string
//       const id = (typeof sub.categoryId === 'object') ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//     // reset chosen subcategory
//     setFormValue(prev => ({ ...prev, subcategory: '' }));
//   };

//   // Add deliverable tag
//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return;
//     setDeliverables(prev => [...prev, dv]);
//     setDeliverableInput('');
//   };

//   const removeDeliverable = (index) => {
//     setDeliverables(prev => prev.filter((_, i) => i !== index));
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setCategoryErrMsg('');
//     setPackageErrMsg('');
//     setLoading(true);

//     const { serviceName, price, discountPrice, offer, category, subcategory } = formValue;

//     if (!serviceName || !price || !discountPrice || !offer || !editorHtml) {
//       setLoading(false);
//       toast.error('All fields are required');
//       return;
//     }
//     if (!category) {
//       setLoading(false);
//       setCategoryErrMsg('Choose at least one Category');
//       return;
//     }
//     if (packageArr.length < 1) {
//       setLoading(false);
//       setPackageErrMsg('Choose at least one Package');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       // append simple fields
//       formData.append('serviceName', serviceName);
//       formData.append('price', price);
//       formData.append('discountPrice', discountPrice);
//       formData.append('offer', offer);
//       formData.append('description', editorHtml);

//       // category & subcategory (IDs)
//       formData.append('category', category);
//       if (subcategory) formData.append('subcategory', subcategory);

//       // package -> send as comma separated string
//       formData.append('package', packageArr.join(','));

//       // deliverables -> JSON string
//    formData.append('Deliverables', JSON.stringify(deliverables));


//       // rating & timeline
//       if (rating) formData.append('rating', rating);
//       if (timeline) formData.append('TimeLine', timeline);

//       // image file
//       if (fileValue.image) {
//         formData.append('image', fileValue.image);
//       }

//       // send request
//       await axios.post(`${Url}/service/add`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       // refresh service list (redux)
//       await dispatch(servicedata());

//       setLoading(false);
//       Swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'New Service Added',
//         showConfirmButton: false,
//         timer: 1500
//       });
//       navigate('/dashboard/service');
//     } catch (err) {
//       console.error('submit error', err);
//       setLoading(false);
//       toast.error('Something went wrong');
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Teamlans | Service</title>
//       </Helmet>
//       <Container className='card bg-white rounded border p-3'>
//         <section>
//           <form className="form" onSubmit={submit}>
//             <div className="row">
//               <div className="col-lg-6 col-md-6 col-12 mb-2">
//                 <div className="form-group">
//                   <label>Service Name</label>
//                   <input type="text" name="serviceName" placeholder='Enter the Service Name' className='form-control addpackageinput' onChange={formHandle} />
//                 </div>
//               </div>

//               <div className="col-lg-6 col-md-6 col-12 mb-2">
//                 <div className="form-group">
//                   <label>Service Image</label>
//                   <input type="file" name="image" className='form-control addpackageinput' onChange={filehandle} />
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-6 col-12 mb-2">
//                 <div className="form-group">
//                   <label>Price ($)</label>
//                   <input type="text" name="price" placeholder='Price' className='form-control addpackageinput' onChange={formHandle} />
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-6 col-12 mb-2">
//                 <div className="form-group">
//                   <label>Discount Price ($)</label>
//                   <input type="text" name="discountPrice" placeholder='Discount Price' className='form-control addpackageinput' onChange={formHandle} />
//                 </div>
//               </div>

//               <div className="col-lg-4 col-md-12 col-12 mb-2">
//                 <div className="form-group">
//                   <label>Extra Offer (%)</label>
//                   <input type="text" name="offer" placeholder='Offer' className='form-control addpackageinput' onChange={formHandle} />
//                 </div>
//               </div>

//               {/* Category */}
//               <div className="col-lg-6 col-md-6 col-12 mb-3">
//                 <div className="form-group">
//                   <label>Category</label>
//                   <select name="category" className="form-select addpackageinput" onChange={handleCategoryChange}>
//                     <option value="">Choose Category</option>
//                     {allCategory.map(cat => <option key={cat._id} value={cat._id}>{cat.category}</option>)}
//                   </select>
//                   <small className='text-danger'>{categoryErrMsg}</small>
//                 </div>
//               </div>

//               {/* Subcategory (filtered) */}
//               <div className="col-lg-6 col-md-6 col-12 mb-3">
//                 <div className="form-group">
//                   <label>Subcategory</label>
//                   <select name="subcategory" className="form-select addpackageinput" onChange={formHandle}>
//                     <option value="">Choose Subcategory</option>
//                     {filteredSub.map(sub => (
//                       <option key={sub._id} value={typeof sub._id === 'object' ? sub._id.toString() : sub._id}>
//                         {sub.subcategory}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* Package checkboxes */}
//               <div className="col-lg-12 col-md-12 col-12 mb-3">
//                 <div className="form-group">
//                   <label>Package</label>
//                   <div className="d-flex flex-wrap align-items-center">
//                     {allPackage.map((item) => (
//                       <div key={item._id} className='d-flex align-item-center me-3'>
//                         <input type="checkbox" onChange={packageAddFunc} value={item._id} className='me-1' />
//                         <span>{item.packageName}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <small className='text-danger'>{packageErrMsg}</small>
//                 </div>
//               </div>

//               {/* Deliverables (tags) */}
//               <div className="col-lg-12 col-md-12 col-12 mb-3">
//                 <div className="form-group">
//                   <label>Deliverables</label>
//                   <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
//                     <input
//                       type="text"
//                       placeholder="Type a deliverable"
//                       value={deliverableInput}
//                       onChange={(e) => setDeliverableInput(e.target.value)}
//                       className="form-control"
//                       style={{ flex: 1 }}
//                     />
//                     <button type="button" className="btn btn-success" onClick={addDeliverable}>+ Add</button>
//                   </div>

//                   <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//                     {deliverables.map((d, idx) => (
//                       <div key={idx} style={{ background: '#e9f2ff', padding: '6px 10px', borderRadius: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
//                         <span>{d}</span>
//                         <button type="button" onClick={() => removeDeliverable(idx)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>✕</button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Rating & Timeline */}
//               <div className="col-lg-6 col-md-6 col-12 mb-3">
//                 <div className="form-group">
//                   <label>Rating (optional)</label>
//                   <input type="number" step="0.1" min="0" max="5" value={rating} onChange={e => setRating(e.target.value)} className="form-control" placeholder="e.g. 4.5" />
//                 </div>
//               </div>

//               <div className="col-lg-6 col-md-6 col-12 mb-3">
//                 <div className="form-group">
//                   <label>TimeLine (24-48 hours/days)</label>
//                   <input type="text" value={timeline} onChange={e => setTimeline(e.target.value)} className="form-control" placeholder="TimeLine" />
//                 </div>
//               </div>

//               {/* Description (Quill) */}
//               <div className="col-12 mb-3">
//                 <div className="form-group">
//                   <label>About Service</label>
//                   <ReactQuill value={editorHtml} onChange={handleEditorChange} placeholder="Write something..." />
//                 </div>
//               </div>

//               <div className="col-12 mb-2">
//                 <button type="submit" disabled={loading} className='btn btn-primary border shadow'>
//                   {loading ? 'Adding...' : 'Add'}
//                 </button>
//               </div>

//             </div>
//           </form>
//         </section>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;








// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Url } from "../url/url";
// import { Container } from "@mui/material";
// import axios from "axios";
// import { servicedata } from "src/redux/slice/service";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AddNewService = () => {
//   const allCategory = useSelector((s) => s.category.data) || [];
//   const allPackage = useSelector((s) => s.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [packageArr, setPackageArr] = useState([]);
//   const [categoryErrMsg, setCategoryErrMsg] = useState("");
//   const [packageErrMsg, setPackageErrMsg] = useState("");
//   const [editorHtml, setEditorHtml] = useState("");
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   const [deliverableInput, setDeliverableInput] = useState("");
//   const [deliverables, setDeliverables] = useState([]);

//   const [rating, setRating] = useState("");
//   const [timeline, setTimeline] = useState("");

//   // Files states
//   const [imageFile, setImageFile] = useState(null); // main single image
//   const [relatedFiles, setRelatedFiles] = useState([]); // multiple
//   const [iconsFiles, setIconsFiles] = useState([]); // multiple

//   useEffect(() => {
//     axios
//       .get(`${Url}/subcategory/getsubcategory`)
//       .then((res) => setSubcategories(res.data.data || []))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const formHandle = (e) => {
//     const key = e.target.name;
//     const value = e.target.value;
//     if (key === "category" || key === "subcategory") {
//       setFormValue((p) => ({ ...p, [key]: value }));
//     } else {
//       setFormValue((p) => ({ ...p, [key]: typeof value === "string" ? value : value }));
//     }
//   };

//   const filehandle = (e) => {
//     const file = e.target.files[0];
//     const name = e.target.name;
//     if (name === "image") {
//       setImageFile(file);
//     }
//   };

//   // handle multiple selects (ctrl)
//   const handleRelatedFiles = (e) => {
//     setRelatedFiles(Array.from(e.target.files));
//   };
//   const handleIconsFiles = (e) => {
//     setIconsFiles(Array.from(e.target.files));
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr((p) => [...p, value]);
//     else setPackageArr((p) => p.filter((x) => x !== value));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue((p) => ({ ...p, category: catId }));
//     const related = subcategories.filter((sub) => {
//       if (!sub.categoryId) return false;
//       const id = typeof sub.categoryId === "object" ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//     setFormValue((p) => ({ ...p, subcategory: "" }));
//   };

//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return;
//     setDeliverables((p) => [...p, dv]);
//     setDeliverableInput("");
//   };
//   const removeDeliverable = (i) => setDeliverables((p) => p.filter((_, idx) => idx !== i));

//   const submit = async (e) => {
//     e.preventDefault();
//     setCategoryErrMsg("");
//     setPackageErrMsg("");
//     setLoading(true);

//     const { serviceName, price, discountPrice, offer, category, subcategory } = formValue;
//     if (!serviceName || !price || !discountPrice || !offer || !editorHtml) {
//       setLoading(false);
//       toast.error("All fields are required");
//       return;
//     }
//     if (!category) {
//       setLoading(false);
//       setCategoryErrMsg("Choose at least one Category");
//       return;
//     }
//     if (packageArr.length < 1) {
//       setLoading(false);
//       setPackageErrMsg("Choose at least one Package");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("serviceName", serviceName);
//       formData.append("price", price);
//       formData.append("discountPrice", discountPrice);
//       formData.append("offer", offer);
//       formData.append("description", editorHtml);

//       formData.append("category", category);
//       if (subcategory) formData.append("subcategory", subcategory);

//       formData.append("package", packageArr.join(","));

//       formData.append("Deliverables", JSON.stringify(deliverables));

//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       if (imageFile) formData.append("image", imageFile);

//       // multiple related files
//       relatedFiles.forEach((f) => formData.append("relatedWorks", f));

//       // multiple icons
//       iconsFiles.forEach((f) => formData.append("iconsFiles", f));

//       await axios.post(`${Url}/service/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       await dispatch(servicedata());
//       setLoading(false);

//       Swal.fire({ position: "top-end", icon: "success", title: "New Service Added", showConfirmButton: false, timer: 1400 });
//       navigate("/dashboard/service");
//     } catch (err) {
//       console.error("submit error", err);
//       setLoading(false);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Teamlans | Service</title>
//       </Helmet>

//       <Container className="card bg-white rounded border p-3">
//         <section>
//           <form className="form" onSubmit={submit}>
//             <div className="row">

//               {/* Service Name */}
//               <div className="col-lg-6 mb-2">
//                 <label>Service Name</label>
//                 <input type="text" name="serviceName" onChange={formHandle} className="form-control" />
//               </div>

//               {/* Main Image */}
//               <div className="col-lg-6 mb-2">
//                 <label>Service Image</label>
//                 <input type="file" name="image" accept="image/*" className="form-control" onChange={filehandle} />
//                 {imageFile && <img src={URL.createObjectURL(imageFile)} alt="preview" style={{ width: 100, marginTop: 8 }} />}
//               </div>

//               {/* Price, discount, offer */}
//               <div className="col-lg-4 mb-2">
//                 <label>Price ($)</label>
//                 <input type="text" name="price" onChange={formHandle} className="form-control" />
//               </div>
//               <div className="col-lg-4 mb-2">
//                 <label>Discount Price ($)</label>
//                 <input type="text" name="discountPrice" onChange={formHandle} className="form-control" />
//               </div>
//               <div className="col-lg-4 mb-2">
//                 <label>Offer (%)</label>
//                 <input type="text" name="offer" onChange={formHandle} className="form-control" />
//               </div>

//               {/* Category */}
//               <div className="col-lg-6 mb-3">
//                 <label>Category</label>
//                 <select name="category" className="form-select" onChange={handleCategoryChange}>
//                   <option value="">Choose Category</option>
//                   {allCategory.map((c) => <option key={c._id} value={c._id}>{c.category}</option>)}
//                 </select>
//                 <small className="text-danger">{categoryErrMsg}</small>
//               </div>

//               {/* Subcategory */}
//               <div className="col-lg-6 mb-3">
//                 <label>Subcategory</label>
//                 <select name="subcategory" className="form-select" onChange={formHandle}>
//                   <option value="">Choose Subcategory</option>
//                   {filteredSub.map((s) => <option key={s._id} value={s._id}>{s.subcategory}</option>)}
//                 </select>
//               </div>

//               {/* Related Works (multiple) */}
//               <div className="col-12 mb-3">
//                 <label>Related Works (images/docs) — hold Ctrl to select multiple</label>
//                 <input type="file" multiple onChange={handleRelatedFiles} className="form-control" />
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
//                   {relatedFiles.map((f, i) => (
//                     <div key={i} style={{ width: 90 }}>
//                       {f.type.includes("image") ? (
//                         <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: "100%", height: 60, objectFit: "cover" }} />
//                       ) : (
//                         <div style={{ padding: 6, border: "1px solid #eee", borderRadius: 8 }}>{f.name}</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Icons Files (multiple) */}
//               <div className="col-12 mb-3">
//                 <label>Icons / File Formats (svg, png, ico etc.) — multiple</label>
//                 <input type="file" multiple onChange={handleIconsFiles} className="form-control" />
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
//                   {iconsFiles.map((f, i) => (
//                     <div key={i} style={{ width: 90 }}>
//                       {f.type.includes("image") ? (
//                         <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: "100%", height: 60, objectFit: "cover" }} />
//                       ) : (
//                         <div style={{ padding: 6, border: "1px solid #eee", borderRadius: 8 }}>{f.name}</div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Packages */}
//               <div className="col-12 mb-3">
//                 <label>Package</label>
//                 <div className="d-flex flex-wrap">
//                   {allPackage.map((p) => (
//                     <div key={p._id} style={{ marginRight: 12 }}>
//                       <input type="checkbox" onChange={packageAddFunc} value={p._id} /> <span>{p.packageName}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <small className="text-danger">{packageErrMsg}</small>
//               </div>

//               {/* Deliverables */}
//               <div className="col-12 mb-3">
//                 <label>Deliverables</label>
//                 <div style={{ display: "flex", gap: 8 }}>
//                   <input value={deliverableInput} onChange={(e) => setDeliverableInput(e.target.value)} className="form-control" />
//                   <button type="button" className="btn btn-success" onClick={addDeliverable}>+ Add</button>
//                 </div>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
//                   {deliverables.map((d, i) => (
//                     <div key={i} style={{ background: "#e9f2ff", padding: "6px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 8 }}>
//                       <span>{d}</span>
//                       <button type="button" className="btn btn-sm btn-link" onClick={() => removeDeliverable(i)}>✕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Rating & Timeline */}
//               <div className="col-lg-6 mb-3">
//                 <label>Rating</label>
//                 <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" />
//               </div>
//               <div className="col-lg-6 mb-3">
//                 <label>TimeLine</label>
//                 <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="form-control" />
//               </div>

//               {/* Description */}
//               <div className="col-12 mb-3">
//                 <label>About Service</label>
//                 <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//               </div>

//               <div className="col-12 mb-2">
//                 <button type="submit" disabled={loading} className="btn btn-primary">
//                   {loading ? "Adding..." : "Add"}
//                 </button>
//               </div>

//             </div>
//           </form>
//         </section>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;













// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Url } from "../url/url";
// import { Container } from "@mui/material";
// import axios from "axios";
// import { servicedata } from "src/redux/slice/service";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AddNewService = () => {
//   const allCategory = useSelector((s) => s.category.data) || [];
//   const allPackage = useSelector((s) => s.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // STATES
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState("");

//   const [packageArr, setPackageArr] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Files
//   const [imageFile, setImageFile] = useState(null);
//   const [relatedFiles, setRelatedFiles] = useState([]);
//   const [iconsFiles, setIconsFiles] = useState([]);

//   // Deliverables
//   const [deliverableInput, setDeliverableInput] = useState("");
//   const [deliverables, setDeliverables] = useState([]);

//   // Extra fields
//   const [rating, setRating] = useState("");
//   const [timeline, setTimeline] = useState("");

//   // Error states
//   const [errors, setErrors] = useState({});

//   // Fetch subcategories
//   useEffect(() => {
//     axios
//       .get(`${Url}/subcategory/getsubcategory`)
//       .then((res) => setSubcategories(res.data.data || []))
//       .catch(() => toast.error("Failed to load subcategories"));
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
//     if (!formValue.price) newErrors.price = "Price is required";
//     if (!formValue.discountPrice) newErrors.discountPrice = "Discount price is required";
//     if (!formValue.offer) newErrors.offer = "Offer is required";

//     if (!formValue.category) newErrors.category = "Category is required";
//     if (!editorHtml.trim()) newErrors.description = "Description is required";

//     if (!imageFile) newErrors.imageFile = "Service image is required";

//     if (packageArr.length === 0) newErrors.package = "Select at least 1 package";
//     if (deliverables.length === 0) newErrors.deliverables = "Add at least 1 deliverable";

//     if (relatedFiles.length === 0)
//       newErrors.relatedFiles = "Upload at least 1 related work file";

//     if (iconsFiles.length === 0)
//       newErrors.iconsFiles = "Upload at least 1 icon format";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue((prev) => ({ ...prev, [name]: value }));

//     // remove error for the field on user input
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const filehandle = (e) => {
//     const f = e.target.files[0];
//     setImageFile(f);
//     setErrors((prev) => ({ ...prev, imageFile: undefined }));
//   };

//   const handleRelatedFiles = (e) => {
//     setRelatedFiles(Array.from(e.target.files));
//     setErrors((prev) => ({ ...prev, relatedFiles: undefined }));
//   };

//   const handleIconsFiles = (e) => {
//     setIconsFiles(Array.from(e.target.files));
//     setErrors((prev) => ({ ...prev, iconsFiles: undefined }));
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr((p) => [...p, value]);
//     else setPackageArr((p) => p.filter((x) => x !== value));
//     setErrors((prev) => ({ ...prev, package: undefined }));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue((p) => ({ ...p, category: catId }));
//     setErrors((prev) => ({ ...prev, category: undefined }));

//     const related = subcategories.filter((sub) => {
//       const id =
//         typeof sub.categoryId === "object"
//           ? sub.categoryId._id
//           : sub.categoryId;
//       return String(id) === String(catId);
//     });

//     setFilteredSub(related);
//   };

//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");

//     setDeliverables((p) => [...p, dv]);
//     setDeliverableInput("");
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables((p) => p.filter((_, idx) => idx !== i));
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(formValue).forEach((k) => {
//         formData.append(k, formValue[k]);
//       });

//       formData.append("description", editorHtml);
//       formData.append("Deliverables", JSON.stringify(deliverables));
//       formData.append("package", packageArr.join(","));

//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       formData.append("image", imageFile);

//       relatedFiles.forEach((f) => formData.append("relatedWorks", f));
//       iconsFiles.forEach((f) => formData.append("iconsFiles", f));

//       const response = await axios.post(`${Url}/service/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Added Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Add Service</title>
//       </Helmet>

//       <Container className="card p-3 bg-white border rounded">
//         <form onSubmit={submit} noValidate>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* MAIN IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
//                 onChange={filehandle}
//               />
//               <div className="invalid-feedback">{errors.imageFile}</div>

//               {imageFile && (
//                 <img
//                   src={URL.createObjectURL(imageFile)}
//                   style={{ width: 100, marginTop: 8 }}
//                 />
//               )}
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input
//                 type="text"
//                 name="price"
//                 onChange={formHandle}
//                 className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.price}</div>
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input
//                 type="text"
//                 name="discountPrice"
//                 onChange={formHandle}
//                 className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.discountPrice}</div>
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input
//                 type="text"
//                 name="offer"
//                 onChange={formHandle}
//                 className={`form-control ${errors.offer ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.offer}</div>
//             </div>

//             {/* CATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Category</label>
//               <select
//                 name="category"
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map((c) => (
//                   <option value={c._id} key={c._id}>
//                     {c.category}
//                   </option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select
//                 name="subcategory"
//                 className="form-select"
//                 onChange={formHandle}
//               >
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map((s) => (
//                   <option value={s._id} key={s._id}>
//                     {s.subcategory}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 className={`form-control ${errors.relatedFiles ? 'is-invalid' : ''}`}
//                 onChange={handleRelatedFiles}
//               />
//               <div className="invalid-feedback">{errors.relatedFiles}</div>

//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {relatedFiles.map((f, i) => (
//                   <div key={i} style={{ width: 90 }}>
//                     {f.type.includes('image') ? (
//                       <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover' }} />
//                     ) : (
//                       <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8 }}>{f.name}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ICON FILES */}
//             <div className="col-12 mb-3">
//               <label>Icon Files (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 className={`form-control ${errors.iconsFiles ? 'is-invalid' : ''}`}
//                 onChange={handleIconsFiles}
//               />
//               <div className="invalid-feedback">{errors.iconsFiles}</div>

//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {iconsFiles.map((f, i) => (
//                   <div key={i} style={{ width: 90 }}>
//                     {f.type.includes('image') ? (
//                       <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover' }} />
//                     ) : (
//                       <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8 }}>{f.name}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map((p) => (
//                   <div key={p._id} style={{ marginRight: "15px" }}>
//                     <input
//                       type="checkbox"
//                       value={p._id}
//                       onChange={packageAddFunc}
//                     />
//                     {p.packageName}
//                   </div>
//                 ))}
//               </div>
//               <div className="text-danger mt-1">{errors.package}</div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className={`form-control ${errors.deliverables ? 'is-invalid' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-success"
//                   onClick={addDeliverable}
//                 >
//                   + Add
//                 </button>
//               </div>
//               <div className="invalid-feedback">{errors.deliverables}</div>

//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {deliverables.map((d, i) => (
//                   <div key={i} style={{ background: '#e9f2ff', padding: '6px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <span>{d}</span>
//                     <button type="button" className="btn btn-sm btn-link" onClick={() => removeDeliverable(i)}>✕</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="5"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 className="form-control"
//               />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input
//                 type="text"
//                 value={timeline}
//                 onChange={(e) => setTimeline(e.target.value)}
//                 className="form-control"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//               <div className="text-danger mt-1">{errors.description}</div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <div className="col-12 mt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn btn-primary w-100"
//               >
//                 {loading ? "Uploading..." : "Add Service"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;




// AddNewService.jsx
// "use client"; // (if you're using Next.js client component) — keep as per your setup
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Url } from "../url/url";
// import { Container } from "@mui/material";
// import axios from "axios";
// import { servicedata } from "src/redux/slice/service";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const SAMPLE_ICON_URL = "/mnt/data/3a9798d2-d9d6-4102-8fb6-41b45e64ef98.png"; // your uploaded file path (placeholder)

// const AddNewService = () => {
//   const allCategory = useSelector((s) => s.category.data) || [];
//   const allPackage = useSelector((s) => s.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // STATES
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState("");

//   const [packageArr, setPackageArr] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Files
//   const [imageFile, setImageFile] = useState(null);
//   const [relatedFiles, setRelatedFiles] = useState([]);
//   // NOTE: iconsFiles now stores selected ICON IDs (from icons library), not File objects
//   const [iconsFiles, setIconsFiles] = useState([]);

//   // icons library list (fetched from backend)
//   const [allIcons, setAllIcons] = useState([]);

//   // Deliverables
//   const [deliverableInput, setDeliverableInput] = useState("");
//   const [deliverables, setDeliverables] = useState([]);

//   // Extra fields
//   const [rating, setRating] = useState("");
//   const [timeline, setTimeline] = useState("");

//   // Error states
//   const [errors, setErrors] = useState({});

//   // Fetch subcategories
//   useEffect(() => {
//     axios
//       .get(`${Url}/subcategory/getsubcategory`)
//       .then((res) => setSubcategories(res.data.data || []))
//       .catch(() => toast.error("Failed to load subcategories"));
//   }, []);

//   // Fetch Icons Library on load
//   useEffect(() => {
//     const fetchIconsLib = async () => {
//       try {
//         const res = await axios.get(`${Url}/icons/all`);
//         setAllIcons(res.data.data || []);
//       } catch (err) {
//         console.error("Failed fetching icons library:", err);
//         toast.error("Failed to load icons library");
//       }
//     };
//     fetchIconsLib();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
//     if (!formValue.price) newErrors.price = "Price is required";
//     if (!formValue.discountPrice) newErrors.discountPrice = "Discount price is required";
//     if (!formValue.offer) newErrors.offer = "Offer is required";

//     if (!formValue.category) newErrors.category = "Category is required";
//     if (!editorHtml.trim()) newErrors.description = "Description is required";

//     if (!imageFile) newErrors.imageFile = "Service image is required";

//     if (packageArr.length === 0) newErrors.package = "Select at least 1 package";
//     if (deliverables.length === 0) newErrors.deliverables = "Add at least 1 deliverable";

//     if (relatedFiles.length === 0)
//       newErrors.relatedFiles = "Upload at least 1 related work file";

//     // IMPORTANT: iconsFiles is now array of IDs - validate accordingly
//     if (iconsFiles.length === 0)
//       newErrors.iconsFiles = "Select at least 1 icon format";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue((prev) => ({ ...prev, [name]: value }));

//     // remove error for the field on user input
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const filehandle = (e) => {
//     const f = e.target.files[0];
//     setImageFile(f);
//     setErrors((prev) => ({ ...prev, imageFile: undefined }));
//   };

//   const handleRelatedFiles = (e) => {
//     setRelatedFiles(Array.from(e.target.files));
//     setErrors((prev) => ({ ...prev, relatedFiles: undefined }));
//   };

//   // NEW: handle select for icons (multi-select)
//   const handleIconsSelect = (e) => {
//     // collect selected option values (icon IDs)
//     const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
//     setIconsFiles(selected);
//     setErrors((prev) => ({ ...prev, iconsFiles: undefined }));
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr((p) => [...p, value]);
//     else setPackageArr((p) => p.filter((x) => x !== value));
//     setErrors((prev) => ({ ...prev, package: undefined }));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue((p) => ({ ...p, category: catId }));
//     setErrors((prev) => ({ ...prev, category: undefined }));

//     const related = subcategories.filter((sub) => {
//       const id =
//         typeof sub.categoryId === "object"
//           ? sub.categoryId._id
//           : sub.categoryId;
//       return String(id) === String(catId);
//     });

//     setFilteredSub(related);
//   };

//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");

//     setDeliverables((p) => [...p, dv]);
//     setDeliverableInput("");
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables((p) => p.filter((_, idx) => idx !== i));
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(formValue).forEach((k) => {
//         formData.append(k, formValue[k]);
//       });

//       formData.append("description", editorHtml);
//       formData.append("Deliverables", JSON.stringify(deliverables));
//       formData.append("package", packageArr.join(","));

//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       formData.append("image", imageFile);

//       relatedFiles.forEach((f) => formData.append("relatedWorks", f));

//       // IMPORTANT: append icons as JSON string of IDs (NOT files)
//       formData.append("iconsFiles", JSON.stringify(iconsFiles));

//       const response = await axios.post(`${Url}/service/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Added Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   // Helper: get icon object by id for preview
//   const getIconById = (id) => allIcons.find((ic) => String(ic._id) === String(id)) || null;

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Add Service</title>
//       </Helmet>

//       <Container className="card p-3 bg-white border rounded">
//         <form onSubmit={submit} noValidate>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* MAIN IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
//                 onChange={filehandle}
//               />
//               <div className="invalid-feedback">{errors.imageFile}</div>

//               {imageFile && (
//                 <img
//                   src={URL.createObjectURL(imageFile)}
//                   style={{ width: 100, marginTop: 8 }}
//                 />
//               )}
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input
//                 type="text"
//                 name="price"
//                 onChange={formHandle}
//                 className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.price}</div>
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input
//                 type="text"
//                 name="discountPrice"
//                 onChange={formHandle}
//                 className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.discountPrice}</div>
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input
//                 type="text"
//                 name="offer"
//                 onChange={formHandle}
//                 className={`form-control ${errors.offer ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.offer}</div>
//             </div>

//             {/* CATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Category</label>
//               <select
//                 name="category"
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map((c) => (
//                   <option value={c._id} key={c._id}>
//                     {c.category}
//                   </option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select
//                 name="subcategory"
//                 className="form-select"
//                 onChange={formHandle}
//               >
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map((s) => (
//                   <option value={s._id} key={s._id}>
//                     {s.subcategory}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 className={`form-control ${errors.relatedFiles ? 'is-invalid' : ''}`}
//                 onChange={handleRelatedFiles}
//               />
//               <div className="invalid-feedback">{errors.relatedFiles}</div>

//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {relatedFiles.map((f, i) => (
//                   <div key={i} style={{ width: 90 }}>
//                     {f.type.includes('image') ? (
//                       <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover' }} />
//                     ) : (
//                       <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8 }}>{f.name}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ICON FILES (REPLACED) */}
//             <div className="col-12 mb-3">
//               <label>Select Icon Formats (from library)</label>

//               <select
//                 multiple
//                 className={`form-select ${errors.iconsFiles ? 'is-invalid' : ''}`}
//                 onChange={handleIconsSelect}
//                 value={iconsFiles}
//               >
//                 {allIcons.map((icon) => (
//                   <option key={icon._id} value={icon._id}>
//                     {icon.name}
//                   </option>
//                 ))}
//               </select>

//               <div className="invalid-feedback">{errors.iconsFiles}</div>

//               {/* PREVIEW SELECTED ICONS */}
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {iconsFiles.length === 0 && (
//                   <div className="text-muted">No icons selected</div>
//                 )}

//                 {iconsFiles.map((id) => {
//                   const ic = getIconById(id);
//                   const src = ic?.iconUrl || SAMPLE_ICON_URL;
//                   return (
//                     <div key={id} style={{ width: 90, textAlign: 'center' }}>
//                       <img src={src} alt={ic?.name || "icon"} style={{ width: '100%', height: 60, objectFit: 'contain', border: '1px solid #eee', borderRadius: 6, padding: 6 }} />
//                       <div className="small mt-1">{ic?.name || "Unknown"}</div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map((p) => (
//                   <div key={p._id} style={{ marginRight: "15px" }}>
//                     <input
//                       type="checkbox"
//                       value={p._id}
//                       onChange={packageAddFunc}
//                     />
//                     <span style={{ marginLeft: 6 }}>{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-danger mt-1">{errors.package}</div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className={`form-control ${errors.deliverables ? 'is-invalid' : ''}`}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-success"
//                   onClick={addDeliverable}
//                 >
//                   + Add
//                 </button>
//               </div>
//               <div className="invalid-feedback">{errors.deliverables}</div>

//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {deliverables.map((d, i) => (
//                   <div key={i} style={{ background: '#e9f2ff', padding: '6px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <span>{d}</span>
//                     <button type="button" className="btn btn-sm btn-link" onClick={() => removeDeliverable(i)}>✕</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="5"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 className="form-control"
//               />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input
//                 type="text"
//                 value={timeline}
//                 onChange={(e) => setTimeline(e.target.value)}
//                 className="form-control"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//               <div className="text-danger mt-1">{errors.description}</div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <div className="col-12 mt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn btn-primary w-100"
//               >
//                 {loading ? "Uploading..." : "Add Service"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;





// "use client";
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Url } from "../url/url";
// import { Container } from "@mui/material";
// import axios from "axios";
// import { servicedata } from "src/redux/slice/service";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AddNewService = () => {
//   const allCategory = useSelector((s) => s.category.data) || [];
//   const allPackage = useSelector((s) => s.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // STATES
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState("");
// const [iconSearch, setIconSearch] = useState("");

//   const [packageArr, setPackageArr] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Files
//   const [imageFile, setImageFile] = useState(null);
//   const [relatedFiles, setRelatedFiles] = useState([]);
  
//   // ✅ Icons - stores selected icon IDs
//   const [selectedIcons, setSelectedIcons] = useState([]);

//   // Icons library list (fetched from backend)
//   const [allIcons, setAllIcons] = useState([]);

//   // Deliverables
//   const [deliverableInput, setDeliverableInput] = useState("");
//   const [deliverables, setDeliverables] = useState([]);

//   // Extra fields
//   const [rating, setRating] = useState("");
//   const [timeline, setTimeline] = useState("");

//   // Error states
//   const [errors, setErrors] = useState({});

//   // Fetch subcategories
//   useEffect(() => {
//     axios
//       .get(`${Url}/subcategory/getsubcategory`)
//       .then((res) => setSubcategories(res.data.data || []))
//       .catch(() => toast.error("Failed to load subcategories"));
//   }, []);

//   // Fetch Icons Library on load
//   useEffect(() => {
//     const fetchIconsLib = async () => {
//       try {
//         const res = await axios.get(`${Url}/icons/all`);
//         setAllIcons(res.data.data || []);
//       } catch (err) {
//         console.error("Failed fetching icons library:", err);
//         toast.error("Failed to load icons library");
//       }
//     };
//     fetchIconsLib();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
//     if (!formValue.price) newErrors.price = "Price is required";
//     if (!formValue.discountPrice) newErrors.discountPrice = "Discount price is required";
//     if (!formValue.offer) newErrors.offer = "Offer is required";
//     if (!formValue.category) newErrors.category = "Category is required";
//     if (!editorHtml.trim()) newErrors.description = "Description is required";
//     if (!imageFile) newErrors.imageFile = "Service image is required";
//     if (packageArr.length === 0) newErrors.package = "Select at least 1 package";
//     if (deliverables.length === 0) newErrors.deliverables = "Add at least 1 deliverable";
//     if (relatedFiles.length === 0) newErrors.relatedFiles = "Upload at least 1 related work file";
    
//     // ✅ Validate icons selection
//     if (selectedIcons.length === 0) newErrors.selectedIcons = "Select at least 1 icon format";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const filehandle = (e) => {
//     const f = e.target.files[0];
//     setImageFile(f);
//     setErrors((prev) => ({ ...prev, imageFile: undefined }));
//   };

//   const handleRelatedFiles = (e) => {
//     setRelatedFiles(Array.from(e.target.files));
//     setErrors((prev) => ({ ...prev, relatedFiles: undefined }));
//   };

//   // ✅ Handle icon checkbox toggle
//   const handleIconToggle = (iconId) => {
//     setSelectedIcons((prev) => {
//       if (prev.includes(iconId)) {
//         // Remove if already selected
//         return prev.filter((id) => id !== iconId);
//       } else {
//         // Add if not selected
//         return [...prev, iconId];
//       }
//     });
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   // ✅ Select All Icons
//   const selectAllIcons = () => {
//     const allIds = allIcons.map((icon) => icon._id);
//     setSelectedIcons(allIds);
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   // ✅ Deselect All Icons
//   const deselectAllIcons = () => {
//     setSelectedIcons([]);
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr((p) => [...p, value]);
//     else setPackageArr((p) => p.filter((x) => x !== value));
//     setErrors((prev) => ({ ...prev, package: undefined }));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue((p) => ({ ...p, category: catId }));
//     setErrors((prev) => ({ ...prev, category: undefined }));

//     const related = subcategories.filter((sub) => {
//       const id = typeof sub.categoryId === "object" ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//   };

//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");
//     setDeliverables((p) => [...p, dv]);
//     setDeliverableInput("");
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables((p) => p.filter((_, idx) => idx !== i));
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(formValue).forEach((k) => {
//         formData.append(k, formValue[k]);
//       });

//       formData.append("description", editorHtml);
//       formData.append("Deliverables", JSON.stringify(deliverables));
//       formData.append("package", packageArr.join(","));

//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       formData.append("image", imageFile);

//       relatedFiles.forEach((f) => formData.append("relatedWorks", f));

//       // ✅ Send selected icon IDs as JSON array
//       formData.append("iconsFiles", JSON.stringify(selectedIcons));

//       const response = await axios.post(`${Url}/service/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Added Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   // Helper: get icon object by id
//   const getIconById = (id) => allIcons.find((ic) => String(ic._id) === String(id)) || null;

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Add Service</title>
//       </Helmet>

//       <Container className="card p-3 bg-white border rounded">
//         <form onSubmit={submit} noValidate>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* MAIN IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
//                 onChange={filehandle}
//               />
//               <div className="invalid-feedback">{errors.imageFile}</div>
//               {imageFile && (
//                 <img
//                   src={URL.createObjectURL(imageFile)}
//                   style={{ width: 100, marginTop: 8, borderRadius: 8 }}
//                   alt="Preview"
//                 />
//               )}
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input
//                 type="text"
//                 name="price"
//                 onChange={formHandle}
//                 className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.price}</div>
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input
//                 type="text"
//                 name="discountPrice"
//                 onChange={formHandle}
//                 className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.discountPrice}</div>
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input
//                 type="text"
//                 name="offer"
//                 onChange={formHandle}
//                 className={`form-control ${errors.offer ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.offer}</div>
//             </div>

//             {/* CATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Category</label>
//               <select
//                 name="category"
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map((c) => (
//                   <option value={c._id} key={c._id}>{c.category}</option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select name="subcategory" className="form-select" onChange={formHandle}>
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map((s) => (
//                   <option value={s._id} key={s._id}>{s.subcategory}</option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 className={`form-control ${errors.relatedFiles ? 'is-invalid' : ''}`}
//                 onChange={handleRelatedFiles}
//               />
//               <div className="invalid-feedback">{errors.relatedFiles}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {relatedFiles.map((f, i) => (
//                   <div key={i} style={{ width: 90 }}>
//                     {f.type.includes('image') ? (
//                       <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 6 }} />
//                     ) : (
//                       <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8, fontSize: 11 }}>{f.name}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ✅ ICON FORMATS - CHECKBOX BASED MULTIPLE SELECT */}
//             {/* <div className="col-12 mb-3">
//               <label>Select Icon Formats</label>
              
              
//               <div className="mb-2">
//                 <button 
//                   type="button" 
//                   className="btn btn-sm btn-outline-primary me-2"
//                   onClick={selectAllIcons}
//                 >
//                   Select All
//                 </button>
//                 <button 
//                   type="button" 
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={deselectAllIcons}
//                 >
//                   Deselect All
//                 </button>
//               </div>

//               <div 
//                 className={`icon-selection-grid ${errors.selectedIcons ? 'border-danger' : ''}`}
//                 style={{ 
//                   display: 'flex', 
//                   flexWrap: 'wrap', 
//                   gap: 12, 
//                   padding: 12, 
//                   border: `1px solid ${errors.selectedIcons ? '#dc3545' : '#dee2e6'}`, 
//                   borderRadius: 8,
//                   background: '#fafafa',
//                   maxHeight: 300,
//                   overflowY: 'auto'
//                 }}
//               >
//                 {allIcons.length === 0 && (
//                   <div className="text-muted">Loading icons...</div>
//                 )}

//                 {allIcons.map((icon) => {
//                   const isSelected = selectedIcons.includes(icon._id);
//                   return (
//                     <div
//                       key={icon._id}
//                       onClick={() => handleIconToggle(icon._id)}
//                       style={{
//                         width: 100,
//                         padding: 10,
//                         border: `2px solid ${isSelected ? '#007bff' : '#e0e0e0'}`,
//                         borderRadius: 8,
//                         background: isSelected ? '#e7f1ff' : '#fff',
//                         cursor: 'pointer',
//                         textAlign: 'center',
//                         transition: 'all 0.2s ease',
//                         position: 'relative'
//                       }}
//                     >
                    
//                       <div 
//                         style={{
//                           position: 'absolute',
//                           top: 5,
//                           right: 5,
//                           width: 20,
//                           height: 20,
//                           borderRadius: 4,
//                           border: `2px solid ${isSelected ? '#007bff' : '#ccc'}`,
//                           background: isSelected ? '#007bff' : '#fff',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           color: '#fff',
//                           fontSize: 12
//                         }}
//                       >
//                         {isSelected && '✓'}
//                       </div>

//                       <img
//                         src={icon.iconUrl || icon.image}
//                         alt={icon.name}
//                         style={{
//                           width: '100%',
//                           height: 50,
//                           objectFit: 'contain',
//                           marginBottom: 6
//                         }}
//                       />
//                       <div style={{ fontSize: 12, fontWeight: 500 }}>{icon.name}</div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {errors.selectedIcons && (
//                 <div className="text-danger mt-1" style={{ fontSize: 13 }}>
//                   {errors.selectedIcons}
//                 </div>
//               )}

              
//               {selectedIcons.length > 0 && (
//                 <div className="mt-2 text-success" style={{ fontSize: 13 }}>
//                   <strong>{selectedIcons.length}</strong> icon format(s) selected
//                 </div>
//               )}

             
//               {selectedIcons.length > 0 && (
//                 <div style={{ marginTop: 10 }}>
//                   <small className="text-muted">Selected:</small>
//                   <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
//                     {selectedIcons.map((id) => {
//                       const icon = getIconById(id);
//                       return (
//                         <span 
//                           key={id} 
//                           style={{ 
//                             background: '#007bff', 
//                             color: '#fff', 
//                             padding: '4px 10px', 
//                             borderRadius: 20, 
//                             fontSize: 12,
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: 6
//                           }}
//                         >
//                           {icon?.name || 'Unknown'}
//                           <span 
//                             onClick={() => handleIconToggle(id)}
//                             style={{ cursor: 'pointer', fontWeight: 'bold' }}
//                           >
//                             ✕
//                           </span>
//                         </span>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div> */}

//             <div className="col-12 mb-3">
//   <label>Select Icon Formats</label>

//   {/* SEARCH + BUTTONS IN SAME ROW */}
//   <div
//     className="d-flex align-items-center mb-3"
//     style={{ gap: "10px", flexWrap: "wrap" }}
//   >
//     {/* Search Bar */}
//     <input
//       type="text"
//       placeholder="Search icons..."
//       className="form-control"
//       value={iconSearch}
//       onChange={(e) => setIconSearch(e.target.value)}
//       style={{
//         maxWidth: "250px",
//         borderRadius: 8,
//         flexShrink: 0,
//       }}
//     />

//     {/* Buttons */}
//     <button
//       type="button"
//       className="btn btn-sm btn-outline-primary"
//       onClick={selectAllIcons}
//     >
//       Select All
//     </button>

//     <button
//       type="button"
//       className="btn btn-sm btn-outline-secondary"
//       onClick={deselectAllIcons}
//     >
//       Deselect All
//     </button>
//   </div>

//   {/* FILTERED ICON GRID */}
//   {(() => {
//     const filteredIcons = allIcons.filter((ic) =>
//       ic.name.toLowerCase().includes(iconSearch.toLowerCase())
//     );

//     return (
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
//           gap: "12px",
//           padding: 12,
//           border: `1px solid ${errors.selectedIcons ? "#dc3545" : "#dee2e6"}`,
//           borderRadius: 8,
//           background: "#fafafa",
//           maxHeight: 330,
//           overflowY: "auto",
//         }}
//       >
//         {filteredIcons.length === 0 ? (
//           <div className="text-muted">No matches found</div>
//         ) : (
//           filteredIcons.map((icon) => {
//             const isSelected = selectedIcons.includes(icon._id);
//             return (
//               <div
//                 key={icon._id}
//                 onClick={() => handleIconToggle(icon._id)}
//                 style={{
//                   width: "100%",
//                   padding: 8,
//                   border: `2px solid ${
//                     isSelected ? "#007bff" : "#e0e0e0"
//                   }`,
//                   borderRadius: 8,
//                   background: isSelected ? "#e7f1ff" : "#fff",
//                   cursor: "pointer",
//                   textAlign: "center",
//                   transition: "0.2s",
//                   position: "relative",
//                 }}
//               >
//                 {/* Checkbox Indicator */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: 5,
//                     right: 5,
//                     width: 20,
//                     height: 20,
//                     borderRadius: 4,
//                     border: `2px solid ${
//                       isSelected ? "#007bff" : "#ccc"
//                     }`,
//                     background: isSelected ? "#007bff" : "#fff",
//                     color: "#fff",
//                     fontSize: 12,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {isSelected && "✓"}
//                 </div>

//                 <img
//                   src={icon.iconUrl}
//                   alt={icon.name}
//                   style={{
//                     width: "100%",
//                     height: 45,
//                     objectFit: "contain",
//                     marginBottom: 6,
//                   }}
//                 />

//                 <div style={{ fontSize: 12, fontWeight: 500 }}>
//                   {icon.name}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>
//     );
//   })()}

//   {errors.selectedIcons && (
//     <div className="text-danger mt-1">{errors.selectedIcons}</div>
//   )}
// </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map((p) => (
//                   <div key={p._id} style={{ marginRight: "15px" }}>
//                     <input type="checkbox" value={p._id} onChange={packageAddFunc} />
//                     <span style={{ marginLeft: 6 }}>{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-danger mt-1">{errors.package}</div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className={`form-control ${errors.deliverables ? 'is-invalid' : ''}`}
//                   placeholder="Enter deliverable"
//                 />
//                 <button type="button" className="btn btn-success" onClick={addDeliverable}>
//                   + Add
//                 </button>
//               </div>
//               <div className="text-danger mt-1">{errors.deliverables}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {deliverables.map((d, i) => (
//                   <div key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <span>{d}</span>
//                     <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="5"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 4.5"
//               />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input
//                 type="text"
//                 value={timeline}
//                 onChange={(e) => setTimeline(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 3-5 days"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//               <div className="text-danger mt-1">{errors.description}</div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <div className="col-12 mt-2">
//               <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Uploading...
//                   </>
//                 ) : (
//                   "Add Service"
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;







// "use client";
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Url } from "../url/url";
// import { Container } from "@mui/material";
// import axios from "axios";
// import { servicedata } from "src/redux/slice/service";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AddNewService = () => {
//   const allCategory = useSelector((s) => s.category.data) || [];
//   const allPackage = useSelector((s) => s.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // STATES
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState("");
//   const [iconSearch, setIconSearch] = useState("");

//   const [packageArr, setPackageArr] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Files
//   const [imageFile, setImageFile] = useState(null);
//   const [relatedFiles, setRelatedFiles] = useState([]);
  
//   // ✅ Icons - stores selected icon IDs
//   const [selectedIcons, setSelectedIcons] = useState([]);

//   // Icons library list (fetched from backend)
//   const [allIcons, setAllIcons] = useState([]);

//   // Deliverables
//   const [deliverableInput, setDeliverableInput] = useState("");
//   const [deliverables, setDeliverables] = useState([]);

//   // Extra fields
//   const [rating, setRating] = useState("");
//   const [timeline, setTimeline] = useState("");

//   // ✅ HSN Code & Tax Percentage
//   const [hsnCode, setHsnCode] = useState("");
//   const [taxPercentage, setTaxPercentage] = useState("");

//   // Error states
//   const [errors, setErrors] = useState({});

//   // Fetch subcategories
//   useEffect(() => {
//     axios
//       .get(`${Url}/subcategory/getsubcategory`)
//       .then((res) => setSubcategories(res.data.data || []))
//       .catch(() => toast.error("Failed to load subcategories"));
//   }, []);

//   // Fetch Icons Library on load
//   useEffect(() => {
//     const fetchIconsLib = async () => {
//       try {
//         const res = await axios.get(`${Url}/icons/all`);
//         setAllIcons(res.data.data || []);
//       } catch (err) {
//         console.error("Failed fetching icons library:", err);
//         toast.error("Failed to load icons library");
//       }
//     };
//     fetchIconsLib();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
//     if (!formValue.price) newErrors.price = "Price is required";
//     if (!formValue.discountPrice) newErrors.discountPrice = "Discount price is required";
//     if (!formValue.offer) newErrors.offer = "Offer is required";
//     if (!formValue.category) newErrors.category = "Category is required";
    
//     // ✅ HSN Code validation
//     if (!hsnCode.trim()) {
//       newErrors.hsnCode = "HSN code is required";
//     } else if (!/^\d{4,8}$/.test(hsnCode.trim())) {
//       newErrors.hsnCode = "HSN code must be 4-8 digits";
//     }
    
//     // ✅ Tax Percentage validation
//     if (!taxPercentage) {
//       newErrors.taxPercentage = "Tax percentage is required";
//     } else if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 100) {
//       newErrors.taxPercentage = "Tax must be between 0-100%";
//     }
    
//     if (!editorHtml.trim()) newErrors.description = "Description is required";
//     if (!imageFile) newErrors.imageFile = "Service image is required";
//     if (packageArr.length === 0) newErrors.package = "Select at least 1 package";
//     if (deliverables.length === 0) newErrors.deliverables = "Add at least 1 deliverable";
//     if (relatedFiles.length === 0) newErrors.relatedFiles = "Upload at least 1 related work file";
    
//     // ✅ Validate icons selection
//     if (selectedIcons.length === 0) newErrors.selectedIcons = "Select at least 1 icon format";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const filehandle = (e) => {
//     const f = e.target.files[0];
//     setImageFile(f);
//     setErrors((prev) => ({ ...prev, imageFile: undefined }));
//   };

//   const handleRelatedFiles = (e) => {
//     setRelatedFiles(Array.from(e.target.files));
//     setErrors((prev) => ({ ...prev, relatedFiles: undefined }));
//   };

//   // ✅ Handle icon checkbox toggle
//   const handleIconToggle = (iconId) => {
//     setSelectedIcons((prev) => {
//       if (prev.includes(iconId)) {
//         return prev.filter((id) => id !== iconId);
//       } else {
//         return [...prev, iconId];
//       }
//     });
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   // ✅ Select All Icons
//   const selectAllIcons = () => {
//     const allIds = allIcons.map((icon) => icon._id);
//     setSelectedIcons(allIds);
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   // ✅ Deselect All Icons
//   const deselectAllIcons = () => {
//     setSelectedIcons([]);
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr((p) => [...p, value]);
//     else setPackageArr((p) => p.filter((x) => x !== value));
//     setErrors((prev) => ({ ...prev, package: undefined }));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue((p) => ({ ...p, category: catId }));
//     setErrors((prev) => ({ ...prev, category: undefined }));

//     const related = subcategories.filter((sub) => {
//       const id = typeof sub.categoryId === "object" ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//   };

//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");
//     setDeliverables((p) => [...p, dv]);
//     setDeliverableInput("");
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables((p) => p.filter((_, idx) => idx !== i));
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(formValue).forEach((k) => {
//         formData.append(k, formValue[k]);
//       });

//       formData.append("description", editorHtml);
//       formData.append("Deliverables", JSON.stringify(deliverables));
//       formData.append("package", packageArr.join(","));

//       // ✅ Add HSN Code and Tax Percentage
//       formData.append("hsnCode", hsnCode.trim());
//       formData.append("taxPercentage", taxPercentage);

//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       formData.append("image", imageFile);

//       relatedFiles.forEach((f) => formData.append("relatedWorks", f));

//       // ✅ Send selected icon IDs as JSON array
//       formData.append("iconsFiles", JSON.stringify(selectedIcons));

//       const response = await axios.post(`${Url}/service/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Added Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   // Helper: get icon object by id
//   const getIconById = (id) => allIcons.find((ic) => String(ic._id) === String(id)) || null;

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Add Service</title>
//       </Helmet>

//       <Container className="card p-3 bg-white border rounded">
//         <form onSubmit={submit} noValidate>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* MAIN IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
//                 onChange={filehandle}
//               />
//               <div className="invalid-feedback">{errors.imageFile}</div>
//               {imageFile && (
//                 <img
//                   src={URL.createObjectURL(imageFile)}
//                   style={{ width: 100, marginTop: 8, borderRadius: 8 }}
//                   alt="Preview"
//                 />
//               )}
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input
//                 type="text"
//                 name="price"
//                 onChange={formHandle}
//                 className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.price}</div>
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input
//                 type="text"
//                 name="discountPrice"
//                 onChange={formHandle}
//                 className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.discountPrice}</div>
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input
//                 type="text"
//                 name="offer"
//                 onChange={formHandle}
//                 className={`form-control ${errors.offer ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.offer}</div>
//             </div>

//             {/* ✅ HSN CODE */}
//             <div className="col-lg-6 mb-3">
//               <label>
//                 HSN Code <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="hsnCode"
//                 value={hsnCode}
//                 onChange={(e) => {
//                   setHsnCode(e.target.value);
//                   setErrors((prev) => ({ ...prev, hsnCode: undefined }));
//                 }}
//                 className={`form-control ${errors.hsnCode ? 'is-invalid' : ''}`}
//                 placeholder="e.g. 998314"
//                 maxLength="8"
//               />
//               <div className="invalid-feedback">{errors.hsnCode}</div>
//               <small className="text-muted">Enter 4-8 digit HSN code for tax classification</small>
//             </div>

//             {/* ✅ TAX PERCENTAGE */}
//             <div className="col-lg-6 mb-3">
//               <label>
//                 Tax Percentage (GST) <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <input
//                   type="number"
//                   name="taxPercentage"
//                   value={taxPercentage}
//                   onChange={(e) => {
//                     setTaxPercentage(e.target.value);
//                     setErrors((prev) => ({ ...prev, taxPercentage: undefined }));
//                   }}
//                   className={`form-control ${errors.taxPercentage ? 'is-invalid' : ''}`}
//                   placeholder="e.g. 18"
//                   min="0"
//                   max="100"
//                   step="0.01"
//                 />
//                 <span className="input-group-text">%</span>
//               </div>
//               <div className="invalid-feedback">{errors.taxPercentage}</div>
//               <small className="text-muted">Tax rate for this service (typically 18% for IT services)</small>
//             </div>

//             {/* CATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Category</label>
//               <select
//                 name="category"
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map((c) => (
//                   <option value={c._id} key={c._id}>{c.category}</option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select name="subcategory" className="form-select" onChange={formHandle}>
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map((s) => (
//                   <option value={s._id} key={s._id}>{s.subcategory}</option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 className={`form-control ${errors.relatedFiles ? 'is-invalid' : ''}`}
//                 onChange={handleRelatedFiles}
//               />
//               <div className="invalid-feedback">{errors.relatedFiles}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {relatedFiles.map((f, i) => (
//                   <div key={i} style={{ width: 90 }}>
//                     {f.type.includes('image') ? (
//                       <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 6 }} />
//                     ) : (
//                       <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8, fontSize: 11 }}>{f.name}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ✅ ICON FORMATS - CHECKBOX BASED MULTIPLE SELECT */}
//             <div className="col-12 mb-3">
//               <label>Select Icon Formats</label>

//               {/* SEARCH + BUTTONS IN SAME ROW */}
//               <div
//                 className="d-flex align-items-center mb-3"
//                 style={{ gap: "10px", flexWrap: "wrap" }}
//               >
//                 {/* Search Bar */}
//                 <input
//                   type="text"
//                   placeholder="Search icons..."
//                   className="form-control"
//                   value={iconSearch}
//                   onChange={(e) => setIconSearch(e.target.value)}
//                   style={{
//                     maxWidth: "250px",
//                     borderRadius: 8,
//                     flexShrink: 0,
//                   }}
//                 />

//                 {/* Buttons */}
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={selectAllIcons}
//                 >
//                   Select All
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={deselectAllIcons}
//                 >
//                   Deselect All
//                 </button>
//               </div>

//               {/* FILTERED ICON GRID */}
//               {(() => {
//                 const filteredIcons = allIcons.filter((ic) =>
//                   ic.name.toLowerCase().includes(iconSearch.toLowerCase())
//                 );

//                 return (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
//                       gap: "12px",
//                       padding: 12,
//                       border: `1px solid ${errors.selectedIcons ? "#dc3545" : "#dee2e6"}`,
//                       borderRadius: 8,
//                       background: "#fafafa",
//                       maxHeight: 330,
//                       overflowY: "auto",
//                     }}
//                   >
//                     {filteredIcons.length === 0 ? (
//                       <div className="text-muted">No matches found</div>
//                     ) : (
//                       filteredIcons.map((icon) => {
//                         const isSelected = selectedIcons.includes(icon._id);
//                         return (
//                           <div
//                             key={icon._id}
//                             onClick={() => handleIconToggle(icon._id)}
//                             style={{
//                               width: "100%",
//                               padding: 8,
//                               border: `2px solid ${
//                                 isSelected ? "#007bff" : "#e0e0e0"
//                               }`,
//                               borderRadius: 8,
//                               background: isSelected ? "#e7f1ff" : "#fff",
//                               cursor: "pointer",
//                               textAlign: "center",
//                               transition: "0.2s",
//                               position: "relative",
//                             }}
//                           >
//                             {/* Checkbox Indicator */}
//                             <div
//                               style={{
//                                 position: "absolute",
//                                 top: 5,
//                                 right: 5,
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: 4,
//                                 border: `2px solid ${
//                                   isSelected ? "#007bff" : "#ccc"
//                                 }`,
//                                 background: isSelected ? "#007bff" : "#fff",
//                                 color: "#fff",
//                                 fontSize: 12,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               {isSelected && "✓"}
//                             </div>

//                             <img
//                               src={icon.iconUrl}
//                               alt={icon.name}
//                               style={{
//                                 width: "100%",
//                                 height: 45,
//                                 objectFit: "contain",
//                                 marginBottom: 6,
//                               }}
//                             />

//                             <div style={{ fontSize: 12, fontWeight: 500 }}>
//                               {icon.name}
//                             </div>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>
//                 );
//               })()}

//               {errors.selectedIcons && (
//                 <div className="text-danger mt-1">{errors.selectedIcons}</div>
//               )}

//               {/* Selected count */}
//               {selectedIcons.length > 0 && (
//                 <div className="mt-2 text-success" style={{ fontSize: 13 }}>
//                   <strong>{selectedIcons.length}</strong> icon format(s) selected
//                 </div>
//               )}
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map((p) => (
//                   <div key={p._id} style={{ marginRight: "15px" }}>
//                     <input type="checkbox" value={p._id} onChange={packageAddFunc} />
//                     <span style={{ marginLeft: 6 }}>{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-danger mt-1">{errors.package}</div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className={`form-control ${errors.deliverables ? 'is-invalid' : ''}`}
//                   placeholder="Enter deliverable"
//                 />
//                 <button type="button" className="btn btn-success" onClick={addDeliverable}>
//                   + Add
//                 </button>
//               </div>
//               <div className="text-danger mt-1">{errors.deliverables}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {deliverables.map((d, i) => (
//                   <div key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <span>{d}</span>
//                     <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="5"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 4.5"
//               />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input
//                 type="text"
//                 value={timeline}
//                 onChange={(e) => setTimeline(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 3-5 days"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//               <div className="text-danger mt-1">{errors.description}</div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <div className="col-12 mt-2">
//               <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Uploading...
//                   </>
//                 ) : (
//                   "Add Service"
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;








// "use client";
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Url } from "../url/url";
// import { Container } from "@mui/material";
// import axios from "axios";
// import { servicedata } from "src/redux/slice/service";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AddNewService = () => {
//   const allCategory = useSelector((s) => s.category.data) || [];
//   const allPackage = useSelector((s) => s.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // STATES
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState("");
//   const [iconSearch, setIconSearch] = useState("");

//   const [packageArr, setPackageArr] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Files
//   const [imageFile, setImageFile] = useState(null);
//   const [relatedFiles, setRelatedFiles] = useState([]);
  
//   // ✅ Icons - stores selected icon IDs
//   const [selectedIcons, setSelectedIcons] = useState([]);

//   // Icons library list (fetched from backend)
//   const [allIcons, setAllIcons] = useState([]);

//   // Deliverables
//   const [deliverableInput, setDeliverableInput] = useState("");
//   const [deliverables, setDeliverables] = useState([]);

//   // Extra fields
//   const [rating, setRating] = useState("");
//   const [timeline, setTimeline] = useState("");

//   // ✅ SAC Code & Tax Percentage (CHANGED FROM HSN)
//   const [sacCode, setSacCode] = useState("");
//   const [taxPercentage, setTaxPercentage] = useState("");

//   // Error states
//   const [errors, setErrors] = useState({});

//   // Fetch subcategories
//   useEffect(() => {
//     axios
//       .get(`${Url}/subcategory/getsubcategory`)
//       .then((res) => setSubcategories(res.data.data || []))
//       .catch(() => toast.error("Failed to load subcategories"));
//   }, []);

//   // Fetch Icons Library on load
//   useEffect(() => {
//     const fetchIconsLib = async () => {
//       try {
//         const res = await axios.get(`${Url}/icons/all`);
//         setAllIcons(res.data.data || []);
//       } catch (err) {
//         console.error("Failed fetching icons library:", err);
//         toast.error("Failed to load icons library");
//       }
//     };
//     fetchIconsLib();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
//     if (!formValue.price) newErrors.price = "Price is required";
//     if (!formValue.discountPrice) newErrors.discountPrice = "Discount price is required";
//     if (!formValue.offer) newErrors.offer = "Offer is required";
//     if (!formValue.category) newErrors.category = "Category is required";
    
//     // ✅ SAC Code validation (6 digits for services)
//     if (!sacCode.trim()) {
//       newErrors.sacCode = "SAC code is required";
//     } else if (!/^\d{6}$/.test(sacCode.trim())) {
//       newErrors.sacCode = "SAC code must be 6 digits";
//     }
    
//     // ✅ Tax Percentage validation
//     if (!taxPercentage) {
//       newErrors.taxPercentage = "Tax percentage is required";
//     } else if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 100) {
//       newErrors.taxPercentage = "Tax must be between 0-100%";
//     }
    
//     if (!editorHtml.trim()) newErrors.description = "Description is required";
//     if (!imageFile) newErrors.imageFile = "Service image is required";
//     if (packageArr.length === 0) newErrors.package = "Select at least 1 package";
//     if (deliverables.length === 0) newErrors.deliverables = "Add at least 1 deliverable";
//     if (relatedFiles.length === 0) newErrors.relatedFiles = "Upload at least 1 related work file";
    
//     // ✅ Validate icons selection
//     if (selectedIcons.length === 0) newErrors.selectedIcons = "Select at least 1 icon format";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const filehandle = (e) => {
//     const f = e.target.files[0];
//     setImageFile(f);
//     setErrors((prev) => ({ ...prev, imageFile: undefined }));
//   };

//   const handleRelatedFiles = (e) => {
//     setRelatedFiles(Array.from(e.target.files));
//     setErrors((prev) => ({ ...prev, relatedFiles: undefined }));
//   };

//   // ✅ Handle icon checkbox toggle
//   const handleIconToggle = (iconId) => {
//     setSelectedIcons((prev) => {
//       if (prev.includes(iconId)) {
//         return prev.filter((id) => id !== iconId);
//       } else {
//         return [...prev, iconId];
//       }
//     });
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   // ✅ Select All Icons
//   const selectAllIcons = () => {
//     const allIds = allIcons.map((icon) => icon._id);
//     setSelectedIcons(allIds);
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   // ✅ Deselect All Icons
//   const deselectAllIcons = () => {
//     setSelectedIcons([]);
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr((p) => [...p, value]);
//     else setPackageArr((p) => p.filter((x) => x !== value));
//     setErrors((prev) => ({ ...prev, package: undefined }));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue((p) => ({ ...p, category: catId }));
//     setErrors((prev) => ({ ...prev, category: undefined }));

//     const related = subcategories.filter((sub) => {
//       const id = typeof sub.categoryId === "object" ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//   };

//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");
//     setDeliverables((p) => [...p, dv]);
//     setDeliverableInput("");
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables((p) => p.filter((_, idx) => idx !== i));
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(formValue).forEach((k) => {
//         formData.append(k, formValue[k]);
//       });

//       formData.append("description", editorHtml);
//       formData.append("Deliverables", JSON.stringify(deliverables));
//       formData.append("package", packageArr.join(","));

//       // ✅ Add SAC Code and Tax Percentage
//       formData.append("sacCode", sacCode.trim());
//       formData.append("taxPercentage", taxPercentage);

//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       formData.append("image", imageFile);

//       relatedFiles.forEach((f) => formData.append("relatedWorks", f));

//       // ✅ Send selected icon IDs as JSON array
//       formData.append("iconsFiles", JSON.stringify(selectedIcons));

//       const response = await axios.post(`${Url}/service/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Added Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   // Helper: get icon object by id
//   const getIconById = (id) => allIcons.find((ic) => String(ic._id) === String(id)) || null;

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Add Service</title>
//       </Helmet>

//       <Container className="card p-3 bg-white border rounded">
//         <form onSubmit={submit} noValidate>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* MAIN IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
//                 onChange={filehandle}
//               />
//               <div className="invalid-feedback">{errors.imageFile}</div>
//               {imageFile && (
//                 <img
//                   src={URL.createObjectURL(imageFile)}
//                   style={{ width: 100, marginTop: 8, borderRadius: 8 }}
//                   alt="Preview"
//                 />
//               )}
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input
//                 type="text"
//                 name="price"
//                 onChange={formHandle}
//                 className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.price}</div>
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input
//                 type="text"
//                 name="discountPrice"
//                 onChange={formHandle}
//                 className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.discountPrice}</div>
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input
//                 type="text"
//                 name="offer"
//                 onChange={formHandle}
//                 className={`form-control ${errors.offer ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.offer}</div>
//             </div>

//             {/* ✅ SAC CODE (CHANGED FROM HSN) */}
//             <div className="col-lg-6 mb-3">
//               <label>
//                 SAC Code <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="sacCode"
//                 value={sacCode}
//                 onChange={(e) => {
//                   setSacCode(e.target.value);
//                   setErrors((prev) => ({ ...prev, sacCode: undefined }));
//                 }}
//                 className={`form-control ${errors.sacCode ? 'is-invalid' : ''}`}
//                 placeholder="e.g. 998314"
//                 maxLength="6"
//               />
//               <div className="invalid-feedback">{errors.sacCode}</div>
//               <small className="text-muted">
//                 Enter 6-digit SAC code for service classification (e.g., 998314 for IT design services)
//               </small>
//             </div>

//             {/* ✅ TAX PERCENTAGE */}
//             <div className="col-lg-6 mb-3">
//               <label>
//                 Tax Percentage (GST) <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <input
//                   type="number"
//                   name="taxPercentage"
//                   value={taxPercentage}
//                   onChange={(e) => {
//                     setTaxPercentage(e.target.value);
//                     setErrors((prev) => ({ ...prev, taxPercentage: undefined }));
//                   }}
//                   className={`form-control ${errors.taxPercentage ? 'is-invalid' : ''}`}
//                   placeholder="e.g. 18"
//                   min="0"
//                   max="100"
//                   step="0.01"
//                 />
//                 <span className="input-group-text">%</span>
//               </div>
//               <div className="invalid-feedback">{errors.taxPercentage}</div>
//               <small className="text-muted">Tax rate for this service (typically 18% for IT services)</small>
//             </div>

//             {/* CATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Category</label>
//               <select
//                 name="category"
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map((c) => (
//                   <option value={c._id} key={c._id}>{c.category}</option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select name="subcategory" className="form-select" onChange={formHandle}>
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map((s) => (
//                   <option value={s._id} key={s._id}>{s.subcategory}</option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 className={`form-control ${errors.relatedFiles ? 'is-invalid' : ''}`}
//                 onChange={handleRelatedFiles}
//               />
//               <div className="invalid-feedback">{errors.relatedFiles}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {relatedFiles.map((f, i) => (
//                   <div key={i} style={{ width: 90 }}>
//                     {f.type.includes('image') ? (
//                       <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 6 }} />
//                     ) : (
//                       <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8, fontSize: 11 }}>{f.name}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ✅ ICON FORMATS - CHECKBOX BASED MULTIPLE SELECT */}
//             <div className="col-12 mb-3">
//               <label>Select Icon Formats</label>

//               {/* SEARCH + BUTTONS IN SAME ROW */}
//               <div
//                 className="d-flex align-items-center mb-3"
//                 style={{ gap: "10px", flexWrap: "wrap" }}
//               >
//                 {/* Search Bar */}
//                 <input
//                   type="text"
//                   placeholder="Search icons..."
//                   className="form-control"
//                   value={iconSearch}
//                   onChange={(e) => setIconSearch(e.target.value)}
//                   style={{
//                     maxWidth: "250px",
//                     borderRadius: 8,
//                     flexShrink: 0,
//                   }}
//                 />

//                 {/* Buttons */}
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={selectAllIcons}
//                 >
//                   Select All
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={deselectAllIcons}
//                 >
//                   Deselect All
//                 </button>
//               </div>

//               {/* FILTERED ICON GRID */}
//               {(() => {
//                 const filteredIcons = allIcons.filter((ic) =>
//                   ic.name.toLowerCase().includes(iconSearch.toLowerCase())
//                 );

//                 return (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
//                       gap: "12px",
//                       padding: 12,
//                       border: `1px solid ${errors.selectedIcons ? "#dc3545" : "#dee2e6"}`,
//                       borderRadius: 8,
//                       background: "#fafafa",
//                       maxHeight: 330,
//                       overflowY: "auto",
//                     }}
//                   >
//                     {filteredIcons.length === 0 ? (
//                       <div className="text-muted">No matches found</div>
//                     ) : (
//                       filteredIcons.map((icon) => {
//                         const isSelected = selectedIcons.includes(icon._id);
//                         return (
//                           <div
//                             key={icon._id}
//                             onClick={() => handleIconToggle(icon._id)}
//                             style={{
//                               width: "100%",
//                               padding: 8,
//                               border: `2px solid ${
//                                 isSelected ? "#007bff" : "#e0e0e0"
//                               }`,
//                               borderRadius: 8,
//                               background: isSelected ? "#e7f1ff" : "#fff",
//                               cursor: "pointer",
//                               textAlign: "center",
//                               transition: "0.2s",
//                               position: "relative",
//                             }}
//                           >
//                             {/* Checkbox Indicator */}
//                             <div
//                               style={{
//                                 position: "absolute",
//                                 top: 5,
//                                 right: 5,
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: 4,
//                                 border: `2px solid ${
//                                   isSelected ? "#007bff" : "#ccc"
//                                 }`,
//                                 background: isSelected ? "#007bff" : "#fff",
//                                 color: "#fff",
//                                 fontSize: 12,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               {isSelected && "✓"}
//                             </div>

//                             <img
//                               src={icon.iconUrl}
//                               alt={icon.name}
//                               style={{
//                                 width: "100%",
//                                 height: 45,
//                                 objectFit: "contain",
//                                 marginBottom: 6,
//                               }}
//                             />

//                             <div style={{ fontSize: 12, fontWeight: 500 }}>
//                               {icon.name}
//                             </div>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>
//                 );
//               })()}

//               {errors.selectedIcons && (
//                 <div className="text-danger mt-1">{errors.selectedIcons}</div>
//               )}

//               {/* Selected count */}
//               {selectedIcons.length > 0 && (
//                 <div className="mt-2 text-success" style={{ fontSize: 13 }}>
//                   <strong>{selectedIcons.length}</strong> icon format(s) selected
//                 </div>
//               )}
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map((p) => (
//                   <div key={p._id} style={{ marginRight: "15px" }}>
//                     <input type="checkbox" value={p._id} onChange={packageAddFunc} />
//                     <span style={{ marginLeft: 6 }}>{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-danger mt-1">{errors.package}</div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className={`form-control ${errors.deliverables ? 'is-invalid' : ''}`}
//                   placeholder="Enter deliverable"
//                 />
//                 <button type="button" className="btn btn-success" onClick={addDeliverable}>
//                   + Add
//                 </button>
//               </div>
//               <div className="text-danger mt-1">{errors.deliverables}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {deliverables.map((d, i) => (
//                   <div key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <span>{d}</span>
//                     <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="5"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 4.5"
//               />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input
//                 type="text"
//                 value={timeline}
//                 onChange={(e) => setTimeline(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 3-5 days"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//               <div className="text-danger mt-1">{errors.description}</div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <div className="col-12 mt-2">
//               <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Uploading...
//                   </>
//                 ) : (
//                   "Add Service"
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;











// "use client";
// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";
// import { Url } from "../url/url";
// import { Container } from "@mui/material";
// import axios from "axios";
// import { servicedata } from "src/redux/slice/service";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const AddNewService = () => {
//   const allCategory = useSelector((s) => s.category.data) || [];
//   const allPackage = useSelector((s) => s.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // STATES
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState("");
//   const [iconSearch, setIconSearch] = useState("");

//   const [packageArr, setPackageArr] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Files
//   const [imageFile, setImageFile] = useState(null);
//   const [relatedFiles, setRelatedFiles] = useState([]);
  
//   // Icons
//   const [selectedIcons, setSelectedIcons] = useState([]);
//   const [allIcons, setAllIcons] = useState([]);

//   // Deliverables
//   const [deliverableInput, setDeliverableInput] = useState("");
//   const [deliverables, setDeliverables] = useState([]);

//   // Extra fields
//   const [rating, setRating] = useState("");
//   const [timeline, setTimeline] = useState("");

//   // ✅ CLEAR PRICING FIELDS (MATCHING DATABASE)
//   const [basePrice, setBasePrice] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [price, setPrice] = useState("");

//   // SAC Code & Tax
//   const [sacCode, setSacCode] = useState("");
//   const [taxPercentage, setTaxPercentage] = useState("");

//   // Error states
//   const [errors, setErrors] = useState({});

//   // ✅ AUTO-CALCULATE PRICE when Base Price or Discount changes
//   useEffect(() => {
//     const base = parseFloat(basePrice) || 0;
//     const disc = parseFloat(discount) || 0;
    
//     if (base > 0 && disc >= 0 && disc <= 100) {
//       const discountAmount = (base * disc) / 100;
//       const final = base - discountAmount;
//       setPrice(final.toFixed(2));
//     } else if (base > 0 && disc === 0) {
//       setPrice(base.toFixed(2));
//     } else {
//       setPrice("");
//     }
//   }, [basePrice, discount]);

//   // Fetch subcategories
//   useEffect(() => {
//     axios
//       .get(`${Url}/subcategory/getsubcategory`)
//       .then((res) => setSubcategories(res.data.data || []))
//       .catch(() => toast.error("Failed to load subcategories"));
//   }, []);

//   // Fetch Icons Library
//   useEffect(() => {
//     const fetchIconsLib = async () => {
//       try {
//         const res = await axios.get(`${Url}/icons/all`);
//         setAllIcons(res.data.data || []);
//       } catch (err) {
//         console.error("Failed fetching icons library:", err);
//         toast.error("Failed to load icons library");
//       }
//     };
//     fetchIconsLib();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
    
//     if (!basePrice || parseFloat(basePrice) <= 0) {
//       newErrors.basePrice = "Base price is required";
//     }
    
//     if (discount && (parseFloat(discount) < 0 || parseFloat(discount) > 100)) {
//       newErrors.discount = "Discount must be between 0-100%";
//     }
    
//     if (!formValue.category) newErrors.category = "Category is required";
    
//     if (!sacCode.trim()) {
//       newErrors.sacCode = "SAC code is required";
//     } else if (!/^\d{6}$/.test(sacCode.trim())) {
//       newErrors.sacCode = "SAC code must be 6 digits";
//     }
    
//     if (!taxPercentage) {
//       newErrors.taxPercentage = "Tax percentage is required";
//     } else if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 100) {
//       newErrors.taxPercentage = "Tax must be between 0-100%";
//     }
    
//     if (!editorHtml.trim()) newErrors.description = "Description is required";
//     if (!imageFile) newErrors.imageFile = "Service image is required";
//     if (packageArr.length === 0) newErrors.package = "Select at least 1 package";
//     if (deliverables.length === 0) newErrors.deliverables = "Add at least 1 deliverable";
//     if (relatedFiles.length === 0) newErrors.relatedFiles = "Upload at least 1 related work file";
//     if (selectedIcons.length === 0) newErrors.selectedIcons = "Select at least 1 icon format";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const filehandle = (e) => {
//     const f = e.target.files[0];
//     setImageFile(f);
//     setErrors((prev) => ({ ...prev, imageFile: undefined }));
//   };

//   const handleRelatedFiles = (e) => {
//     setRelatedFiles(Array.from(e.target.files));
//     setErrors((prev) => ({ ...prev, relatedFiles: undefined }));
//   };

//   const handleIconToggle = (iconId) => {
//     setSelectedIcons((prev) => {
//       if (prev.includes(iconId)) {
//         return prev.filter((id) => id !== iconId);
//       } else {
//         return [...prev, iconId];
//       }
//     });
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   const selectAllIcons = () => {
//     const allIds = allIcons.map((icon) => icon._id);
//     setSelectedIcons(allIds);
//     setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
//   };

//   const deselectAllIcons = () => {
//     setSelectedIcons([]);
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr((p) => [...p, value]);
//     else setPackageArr((p) => p.filter((x) => x !== value));
//     setErrors((prev) => ({ ...prev, package: undefined }));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue((p) => ({ ...p, category: catId }));
//     setErrors((prev) => ({ ...prev, category: undefined }));

//     const related = subcategories.filter((sub) => {
//       const id = typeof sub.categoryId === "object" ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//   };

//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");
//     setDeliverables((p) => [...p, dv]);
//     setDeliverableInput("");
//     setErrors((prev) => ({ ...prev, deliverables: undefined }));
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables((p) => p.filter((_, idx) => idx !== i));
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       Object.keys(formValue).forEach((k) => {
//         formData.append(k, formValue[k]);
//       });

//       formData.append("description", editorHtml);
//       formData.append("Deliverables", JSON.stringify(deliverables));
//       formData.append("package", packageArr.join(","));

//       // ✅ CLEAR FIELD NAMES (MATCHING DATABASE)
//       formData.append("basePrice", basePrice);  // Base price
//       formData.append("discount", discount || "0");  // Discount %
//       formData.append("price", price);  // Final price

//       formData.append("sacCode", sacCode.trim());
//       formData.append("taxPercentage", taxPercentage);

//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       formData.append("image", imageFile);

//       relatedFiles.forEach((f) => formData.append("relatedWorks", f));
//       formData.append("iconsFiles", JSON.stringify(selectedIcons));

//       const response = await axios.post(`${Url}/service/add`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Added Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <Helmet>
//         <title>Add Service</title>
//       </Helmet>

//       <Container className="card p-3 bg-white border rounded">
//         <form onSubmit={submit} noValidate>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* MAIN IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
//                 onChange={filehandle}
//               />
//               <div className="invalid-feedback">{errors.imageFile}</div>
//               {imageFile && (
//                 <img
//                   src={URL.createObjectURL(imageFile)}
//                   style={{ width: 100, marginTop: 8, borderRadius: 8 }}
//                   alt="Preview"
//                 />
//               )}
//             </div>

//             {/* ✅ BASE PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Base Price ($)</label>
//               <input
//                 type="text"
//                 value={basePrice}
//                 onChange={(e) => {
//                   setBasePrice(e.target.value);
//                   setErrors((prev) => ({ ...prev, basePrice: undefined }));
//                 }}
//                 className={`form-control ${errors.basePrice ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.basePrice}</div>
//             </div>

//             {/* ✅ DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount (%)</label>
//               <input
//                 type="text"
//                 value={discount}
//                 onChange={(e) => {
//                   setDiscount(e.target.value);
//                   setErrors((prev) => ({ ...prev, discount: undefined }));
//                 }}
//                 className={`form-control ${errors.discount ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.discount}</div>
//             </div>

//             {/* ✅ PRICE (AUTO-CALCULATED) */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input
//                 type="text"
//                 value={price}
//                 className="form-control"
//                 readOnly
//                 style={{ background: '#e9ecef' }}
//               />
//             </div>

//             {/* SAC CODE */}
//             <div className="col-lg-6 mb-3">
//               <label>
//                 SAC Code <span className="text-danger">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="sacCode"
//                 value={sacCode}
//                 onChange={(e) => {
//                   setSacCode(e.target.value);
//                   setErrors((prev) => ({ ...prev, sacCode: undefined }));
//                 }}
//                 className={`form-control ${errors.sacCode ? 'is-invalid' : ''}`}
//                 placeholder="e.g. 998314"
//                 maxLength="6"
//               />
//               <div className="invalid-feedback">{errors.sacCode}</div>
//               <small className="text-muted">
//                 Enter 6-digit SAC code for service classification (e.g., 998314 for IT design services)
//               </small>
//             </div>

//             {/* TAX PERCENTAGE */}
//             <div className="col-lg-6 mb-3">
//               <label>
//                 Tax Percentage (GST) <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <input
//                   type="number"
//                   name="taxPercentage"
//                   value={taxPercentage}
//                   onChange={(e) => {
//                     setTaxPercentage(e.target.value);
//                     setErrors((prev) => ({ ...prev, taxPercentage: undefined }));
//                   }}
//                   className={`form-control ${errors.taxPercentage ? 'is-invalid' : ''}`}
//                   placeholder="e.g. 18"
//                   min="0"
//                   max="100"
//                   step="0.01"
//                 />
//                 <span className="input-group-text">%</span>
//               </div>
//               <div className="invalid-feedback">{errors.taxPercentage}</div>
//               <small className="text-muted">Tax rate for this service (typically 18% for IT services)</small>
//             </div>

//             {/* CATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Category</label>
//               <select
//                 name="category"
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//                 onChange={handleCategoryChange}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map((c) => (
//                   <option value={c._id} key={c._id}>{c.category}</option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select name="subcategory" className="form-select" onChange={formHandle}>
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map((s) => (
//                   <option value={s._id} key={s._id}>{s.subcategory}</option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works (multiple)</label>
//               <input
//                 type="file"
//                 multiple
//                 className={`form-control ${errors.relatedFiles ? 'is-invalid' : ''}`}
//                 onChange={handleRelatedFiles}
//               />
//               <div className="invalid-feedback">{errors.relatedFiles}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {relatedFiles.map((f, i) => (
//                   <div key={i} style={{ width: 90 }}>
//                     {f.type.includes('image') ? (
//                       <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 6 }} />
//                     ) : (
//                       <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8, fontSize: 11 }}>{f.name}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ICON FORMATS */}
//             <div className="col-12 mb-3">
//               <label>Select Icon Formats</label>

//               <div
//                 className="d-flex align-items-center mb-3"
//                 style={{ gap: "10px", flexWrap: "wrap" }}
//               >
//                 <input
//                   type="text"
//                   placeholder="Search icons..."
//                   className="form-control"
//                   value={iconSearch}
//                   onChange={(e) => setIconSearch(e.target.value)}
//                   style={{
//                     maxWidth: "250px",
//                     borderRadius: 8,
//                     flexShrink: 0,
//                   }}
//                 />

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-primary"
//                   onClick={selectAllIcons}
//                 >
//                   Select All
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={deselectAllIcons}
//                 >
//                   Deselect All
//                 </button>
//               </div>

//               {(() => {
//                 const filteredIcons = allIcons.filter((ic) =>
//                   ic.name.toLowerCase().includes(iconSearch.toLowerCase())
//                 );

//                 return (
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
//                       gap: "12px",
//                       padding: 12,
//                       border: `1px solid ${errors.selectedIcons ? "#dc3545" : "#dee2e6"}`,
//                       borderRadius: 8,
//                       background: "#fafafa",
//                       maxHeight: 330,
//                       overflowY: "auto",
//                     }}
//                   >
//                     {filteredIcons.length === 0 ? (
//                       <div className="text-muted">No matches found</div>
//                     ) : (
//                       filteredIcons.map((icon) => {
//                         const isSelected = selectedIcons.includes(icon._id);
//                         return (
//                           <div
//                             key={icon._id}
//                             onClick={() => handleIconToggle(icon._id)}
//                             style={{
//                               width: "100%",
//                               padding: 8,
//                               border: `2px solid ${
//                                 isSelected ? "#007bff" : "#e0e0e0"
//                               }`,
//                               borderRadius: 8,
//                               background: isSelected ? "#e7f1ff" : "#fff",
//                               cursor: "pointer",
//                               textAlign: "center",
//                               transition: "0.2s",
//                               position: "relative",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 position: "absolute",
//                                 top: 5,
//                                 right: 5,
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: 4,
//                                 border: `2px solid ${
//                                   isSelected ? "#007bff" : "#ccc"
//                                 }`,
//                                 background: isSelected ? "#007bff" : "#fff",
//                                 color: "#fff",
//                                 fontSize: 12,
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                               }}
//                             >
//                               {isSelected && "✓"}
//                             </div>

//                             <img
//                               src={icon.iconUrl}
//                               alt={icon.name}
//                               style={{
//                                 width: "100%",
//                                 height: 45,
//                                 objectFit: "contain",
//                                 marginBottom: 6,
//                               }}
//                             />

//                             <div style={{ fontSize: 12, fontWeight: 500 }}>
//                               {icon.name}
//                             </div>
//                           </div>
//                         );
//                       })
//                     )}
//                   </div>
//                 );
//               })()}

//               {errors.selectedIcons && (
//                 <div className="text-danger mt-1">{errors.selectedIcons}</div>
//               )}

//               {selectedIcons.length > 0 && (
//                 <div className="mt-2 text-success" style={{ fontSize: 13 }}>
//                   <strong>{selectedIcons.length}</strong> icon format(s) selected
//                 </div>
//               )}
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map((p) => (
//                   <div key={p._id} style={{ marginRight: "15px" }}>
//                     <input type="checkbox" value={p._id} onChange={packageAddFunc} />
//                     <span style={{ marginLeft: 6 }}>{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-danger mt-1">{errors.package}</div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className={`form-control ${errors.deliverables ? 'is-invalid' : ''}`}
//                   placeholder="Enter deliverable"
//                 />
//                 <button type="button" className="btn btn-success" onClick={addDeliverable}>
//                   + Add
//                 </button>
//               </div>
//               <div className="text-danger mt-1">{errors.deliverables}</div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
//                 {deliverables.map((d, i) => (
//                   <div key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     <span>{d}</span>
//                     <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="5"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 4.5"
//               />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input
//                 type="text"
//                 value={timeline}
//                 onChange={(e) => setTimeline(e.target.value)}
//                 className="form-control"
//                 placeholder="e.g. 3-5 days"
//               />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//               <div className="text-danger mt-1">{errors.description}</div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <div className="col-12 mt-2">
//               <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
//                 {loading ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2"></span>
//                     Uploading...
//                   </>
//                 ) : (
//                   "Add Service"
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default AddNewService;







"use client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Url } from "../url/url";
import { Container } from "@mui/material";
import axios from "axios";
import { servicedata } from "src/redux/slice/service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddNewService = () => {
  const allCategory = useSelector((s) => s.category.data) || [];
  const allPackage = useSelector((s) => s.package.data) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATES
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [editorHtml, setEditorHtml] = useState("");
  const [iconSearch, setIconSearch] = useState("");

  const [packageArr, setPackageArr] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSub, setFilteredSub] = useState([]);

  // Files
  const [imageFile, setImageFile] = useState(null);
  const [relatedFiles, setRelatedFiles] = useState([]);
  
  // Icons
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [allIcons, setAllIcons] = useState([]);

  // Deliverables
  const [deliverableInput, setDeliverableInput] = useState("");
  const [deliverables, setDeliverables] = useState([]);

  // Extra fields
  const [rating, setRating] = useState("");
  const [timeline, setTimeline] = useState("");

  // ✅ CLEAR PRICING FIELDS (MATCHING DATABASE)
  const [basePrice, setBasePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");

  // SAC Code & Tax
  const [sacCode, setSacCode] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");

  // Error states
  const [errors, setErrors] = useState({});

  // ✅ AUTO-CALCULATE PRICE when Base Price or Discount changes
  useEffect(() => {
    const base = parseFloat(basePrice) || 0;
    const disc = parseFloat(discount) || 0;
    
    if (base > 0 && disc >= 0 && disc <= 100) {
      const discountAmount = (base * disc) / 100;
      const final = base - discountAmount;
      // ✅ Remove unnecessary .00 - only show decimals if needed
      setPrice(final % 1 === 0 ? final.toString() : final.toFixed(2));
    } else if (base > 0 && disc === 0) {
      // ✅ If no discount, show base price as-is (no .00)
      setPrice(base % 1 === 0 ? base.toString() : base.toFixed(2));
    } else {
      setPrice("");
    }
  }, [basePrice, discount]);

  // Fetch subcategories
  useEffect(() => {
    axios
      .get(`${Url}/subcategory/getsubcategory`)
      .then((res) => setSubcategories(res.data.data || []))
      .catch(() => toast.error("Failed to load subcategories"));
  }, []);

  // Fetch Icons Library
  useEffect(() => {
    const fetchIconsLib = async () => {
      try {
        const res = await axios.get(`${Url}/icons/all`);
        setAllIcons(res.data.data || []);
      } catch (err) {
        console.error("Failed fetching icons library:", err);
        toast.error("Failed to load icons library");
      }
    };
    fetchIconsLib();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
    
    if (!basePrice || parseFloat(basePrice) <= 0) {
      newErrors.basePrice = "Base price is required";
    }
    
    if (discount && (parseFloat(discount) < 0 || parseFloat(discount) > 100)) {
      newErrors.discount = "Discount must be between 0-100%";
    }
    
    if (!formValue.category) newErrors.category = "Category is required";
    
    if (!sacCode.trim()) {
      newErrors.sacCode = "SAC code is required";
    } else if (!/^\d{6}$/.test(sacCode.trim())) {
      newErrors.sacCode = "SAC code must be 6 digits";
    }
    
    if (!taxPercentage) {
      newErrors.taxPercentage = "Tax percentage is required";
    } else if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 100) {
      newErrors.taxPercentage = "Tax must be between 0-100%";
    }
    
    if (!editorHtml.trim()) newErrors.description = "Description is required";
    if (!imageFile) newErrors.imageFile = "Service image is required";
    if (packageArr.length === 0) newErrors.package = "Select at least 1 package";
    if (deliverables.length === 0) newErrors.deliverables = "Add at least 1 deliverable";
    if (relatedFiles.length === 0) newErrors.relatedFiles = "Upload at least 1 related work file";
    if (selectedIcons.length === 0) newErrors.selectedIcons = "Select at least 1 icon format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditorChange = (html) => setEditorHtml(html);

  const formHandle = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const filehandle = (e) => {
    const f = e.target.files[0];
    setImageFile(f);
    setErrors((prev) => ({ ...prev, imageFile: undefined }));
  };

  const handleRelatedFiles = (e) => {
    setRelatedFiles(Array.from(e.target.files));
    setErrors((prev) => ({ ...prev, relatedFiles: undefined }));
  };

  const handleIconToggle = (iconId) => {
    setSelectedIcons((prev) => {
      if (prev.includes(iconId)) {
        return prev.filter((id) => id !== iconId);
      } else {
        return [...prev, iconId];
      }
    });
    setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
  };

  const selectAllIcons = () => {
    const allIds = allIcons.map((icon) => icon._id);
    setSelectedIcons(allIds);
    setErrors((prev) => ({ ...prev, selectedIcons: undefined }));
  };

  const deselectAllIcons = () => {
    setSelectedIcons([]);
  };

  const packageAddFunc = (e) => {
    const { value, checked } = e.target;
    if (checked) setPackageArr((p) => [...p, value]);
    else setPackageArr((p) => p.filter((x) => x !== value));
    setErrors((prev) => ({ ...prev, package: undefined }));
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setFormValue((p) => ({ ...p, category: catId }));
    setErrors((prev) => ({ ...prev, category: undefined }));

    const related = subcategories.filter((sub) => {
      const id = typeof sub.categoryId === "object" ? sub.categoryId._id : sub.categoryId;
      return String(id) === String(catId);
    });
    setFilteredSub(related);
  };

  const addDeliverable = () => {
    const dv = deliverableInput.trim();
    if (!dv) return toast.error("Enter deliverable first");
    setDeliverables((p) => [...p, dv]);
    setDeliverableInput("");
    setErrors((prev) => ({ ...prev, deliverables: undefined }));
  };

  const removeDeliverable = (i) => {
    setDeliverables((p) => p.filter((_, idx) => idx !== i));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(formValue).forEach((k) => {
        formData.append(k, formValue[k]);
      });

      formData.append("description", editorHtml);
      formData.append("Deliverables", JSON.stringify(deliverables));
      formData.append("package", packageArr.join(","));

      // ✅ CLEAR FIELD NAMES (MATCHING DATABASE)
      formData.append("basePrice", basePrice);  // Base price
      formData.append("discount", discount || "0");  // Discount %
      formData.append("price", price);  // Final price

      formData.append("sacCode", sacCode.trim());
      formData.append("taxPercentage", taxPercentage);

      if (rating) formData.append("rating", rating);
      if (timeline) formData.append("TimeLine", timeline);

      formData.append("image", imageFile);

      relatedFiles.forEach((f) => formData.append("relatedWorks", f));
      formData.append("iconsFiles", JSON.stringify(selectedIcons));

      const response = await axios.post(`${Url}/service/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Service Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(servicedata());
        navigate("/dashboard/service");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Server error");
    }

    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title>Add Service</title>
      </Helmet>

      <Container className="card p-3 bg-white border rounded">
        <form onSubmit={submit} noValidate>
          <div className="row">

            {/* SERVICE NAME */}
            <div className="col-lg-6 mb-2">
              <label>Service Name</label>
              <input
                type="text"
                name="serviceName"
                onChange={formHandle}
                className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.serviceName}</div>
            </div>

            {/* MAIN IMAGE */}
            <div className="col-lg-6 mb-2">
              <label>Service Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className={`form-control ${errors.imageFile ? 'is-invalid' : ''}`}
                onChange={filehandle}
              />
              <div className="invalid-feedback">{errors.imageFile}</div>
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  style={{ width: 100, marginTop: 8, borderRadius: 8 }}
                  alt="Preview"
                />
              )}
            </div>

            {/* ✅ BASE PRICE */}
            <div className="col-lg-4 mb-2">
              <label>Base Price ($)</label>
              <input
                type="text"
                value={basePrice}
                onChange={(e) => {
                  setBasePrice(e.target.value);
                  setErrors((prev) => ({ ...prev, basePrice: undefined }));
                }}
                className={`form-control ${errors.basePrice ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.basePrice}</div>
            </div>

            {/* ✅ DISCOUNT */}
            <div className="col-lg-4 mb-2">
              <label>Discount (%)</label>
              <input
                type="text"
                value={discount}
                onChange={(e) => {
                  setDiscount(e.target.value);
                  setErrors((prev) => ({ ...prev, discount: undefined }));
                }}
                className={`form-control ${errors.discount ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.discount}</div>
            </div>

            {/* ✅ PRICE (AUTO-CALCULATED) */}
            <div className="col-lg-4 mb-2">
              <label>Price ($)</label>
              <input
                type="text"
                value={price}
                className="form-control"
                readOnly
                style={{ background: '#e9ecef' }}
              />
            </div>

            {/* SAC CODE */}
            <div className="col-lg-6 mb-3">
              <label>
                SAC Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="sacCode"
                value={sacCode}
                onChange={(e) => {
                  setSacCode(e.target.value);
                  setErrors((prev) => ({ ...prev, sacCode: undefined }));
                }}
                className={`form-control ${errors.sacCode ? 'is-invalid' : ''}`}
                placeholder="e.g. 998314"
                maxLength="6"
              />
              <div className="invalid-feedback">{errors.sacCode}</div>
              <small className="text-muted">
                Enter 6-digit SAC code for service classification (e.g., 998314 for IT design services)
              </small>
            </div>

            {/* TAX PERCENTAGE */}
            <div className="col-lg-6 mb-3">
              <label>
                Tax Percentage (GST) <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="number"
                  name="taxPercentage"
                  value={taxPercentage}
                  onChange={(e) => {
                    setTaxPercentage(e.target.value);
                    setErrors((prev) => ({ ...prev, taxPercentage: undefined }));
                  }}
                  className={`form-control ${errors.taxPercentage ? 'is-invalid' : ''}`}
                  placeholder="e.g. 18"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <span className="input-group-text">%</span>
              </div>
              <div className="invalid-feedback">{errors.taxPercentage}</div>
              <small className="text-muted">Tax rate for this service (typically 18% for IT services)</small>
            </div>

            {/* CATEGORY */}
            <div className="col-lg-6 mb-3">
              <label>Category</label>
              <select
                name="category"
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                onChange={handleCategoryChange}
              >
                <option value="">Choose Category</option>
                {allCategory.map((c) => (
                  <option value={c._id} key={c._id}>{c.category}</option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.category}</div>
            </div>

            {/* SUBCATEGORY */}
            <div className="col-lg-6 mb-3">
              <label>Subcategory</label>
              <select name="subcategory" className="form-select" onChange={formHandle}>
                <option value="">Choose Subcategory</option>
                {filteredSub.map((s) => (
                  <option value={s._id} key={s._id}>{s.subcategory}</option>
                ))}
              </select>
            </div>

            {/* RELATED WORKS */}
            <div className="col-12 mb-3">
              <label>Related Works (multiple)</label>
              <input
                type="file"
                multiple
                className={`form-control ${errors.relatedFiles ? 'is-invalid' : ''}`}
                onChange={handleRelatedFiles}
              />
              <div className="invalid-feedback">{errors.relatedFiles}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {relatedFiles.map((f, i) => (
                  <div key={i} style={{ width: 90 }}>
                    {f.type.includes('image') ? (
                      <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 6 }} />
                    ) : (
                      <div style={{ padding: 6, border: '1px solid #eee', borderRadius: 8, fontSize: 11 }}>{f.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ICON FORMATS */}
            <div className="col-12 mb-3">
              <label>Select Icon Formats</label>

              <div
                className="d-flex align-items-center mb-3"
                style={{ gap: "10px", flexWrap: "wrap" }}
              >
                <input
                  type="text"
                  placeholder="Search icons..."
                  className="form-control"
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  style={{
                    maxWidth: "250px",
                    borderRadius: 8,
                    flexShrink: 0,
                  }}
                />

                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={selectAllIcons}
                >
                  Select All
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={deselectAllIcons}
                >
                  Deselect All
                </button>
              </div>

              {(() => {
                const filteredIcons = allIcons.filter((ic) =>
                  ic.name.toLowerCase().includes(iconSearch.toLowerCase())
                );

                return (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                      gap: "12px",
                      padding: 12,
                      border: `1px solid ${errors.selectedIcons ? "#dc3545" : "#dee2e6"}`,
                      borderRadius: 8,
                      background: "#fafafa",
                      maxHeight: 330,
                      overflowY: "auto",
                    }}
                  >
                    {filteredIcons.length === 0 ? (
                      <div className="text-muted">No matches found</div>
                    ) : (
                      filteredIcons.map((icon) => {
                        const isSelected = selectedIcons.includes(icon._id);
                        return (
                          <div
                            key={icon._id}
                            onClick={() => handleIconToggle(icon._id)}
                            style={{
                              width: "100%",
                              padding: 8,
                              border: `2px solid ${
                                isSelected ? "#007bff" : "#e0e0e0"
                              }`,
                              borderRadius: 8,
                              background: isSelected ? "#e7f1ff" : "#fff",
                              cursor: "pointer",
                              textAlign: "center",
                              transition: "0.2s",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                width: 20,
                                height: 20,
                                borderRadius: 4,
                                border: `2px solid ${
                                  isSelected ? "#007bff" : "#ccc"
                                }`,
                                background: isSelected ? "#007bff" : "#fff",
                                color: "#fff",
                                fontSize: 12,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isSelected && "✓"}
                            </div>

                            <img
                              src={icon.iconUrl}
                              alt={icon.name}
                              style={{
                                width: "100%",
                                height: 45,
                                objectFit: "contain",
                                marginBottom: 6,
                              }}
                            />

                            <div style={{ fontSize: 12, fontWeight: 500 }}>
                              {icon.name}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              })()}

              {errors.selectedIcons && (
                <div className="text-danger mt-1">{errors.selectedIcons}</div>
              )}

              {selectedIcons.length > 0 && (
                <div className="mt-2 text-success" style={{ fontSize: 13 }}>
                  <strong>{selectedIcons.length}</strong> icon format(s) selected
                </div>
              )}
            </div>

            {/* PACKAGES */}
            <div className="col-12 mb-3">
              <label>Package</label>
              <div className="d-flex flex-wrap">
                {/* ✅ STATIC CUSTOM SERVICE OPTION */}
                <div style={{ marginRight: "15px" }}>
                  <input 
                    type="checkbox" 
                    value="custom-service" 
                    onChange={packageAddFunc} 
                  />
                  <span style={{ marginLeft: 6, fontWeight: 500 }}>Custom Service</span>
                </div>
                
                {/* DYNAMIC PACKAGES */}
                {allPackage.map((p) => (
                  <div key={p._id} style={{ marginRight: "15px" }}>
                    <input type="checkbox" value={p._id} onChange={packageAddFunc} />
                    <span style={{ marginLeft: 6 }}>{p.packageName}</span>
                  </div>
                ))}
              </div>
              <div className="text-danger mt-1">{errors.package}</div>
            </div>

            {/* DELIVERABLES */}
            <div className="col-12 mb-3">
              <label>Deliverables</label>
              <div className="d-flex gap-2">
                <input
                  value={deliverableInput}
                  onChange={(e) => setDeliverableInput(e.target.value)}
                  className={`form-control ${errors.deliverables ? 'is-invalid' : ''}`}
                  placeholder="Enter deliverable"
                />
                <button type="button" className="btn btn-success" onClick={addDeliverable}>
                  + Add
                </button>
              </div>
              <div className="text-danger mt-1">{errors.deliverables}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                {deliverables.map((d, i) => (
                  <div key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{d}</span>
                    <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            {/* RATING */}
            <div className="col-lg-6 mb-3">
              <label>Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="form-control"
                placeholder="e.g. 4.5"
              />
            </div>

            {/* TIMELINE */}
            <div className="col-lg-6 mb-3">
              <label>TimeLine</label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="form-control"
                placeholder="e.g. 3-5 days"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="col-12 mb-3">
              <label>Description</label>
              <ReactQuill value={editorHtml} onChange={handleEditorChange} />
              <div className="text-danger mt-1">{errors.description}</div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="col-12 mt-2">
              <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Uploading...
                  </>
                ) : (
                  "Add Service"
                )}
              </button>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddNewService;