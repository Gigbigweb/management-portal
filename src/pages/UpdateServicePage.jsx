// import React, { useEffect, useState } from 'react'
// import { Helmet } from 'react-helmet-async';
// import {  Container, Stack, Typography} from '@mui/material';  
// import {   useNavigate, useParams } from 'react-router-dom';  
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';  
// import 'react-quill/dist/quill.snow.css'; // import styles
// import ReactQuill from 'react-quill';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { SingleService } from 'src/Api/Api';
// import { Url } from 'src/url/url';
// import { servicedata } from 'src/redux/slice/service';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const UpdateServicePage = () => {
//     const {serviceId} = useParams()  
//     const allCategory = useSelector(store => store.category.data) 
//     const allPackage = useSelector(store => store.package.data) 
//     const dispatch = useDispatch()
//     const navigate = useNavigate() 
//     const [formValue, setFormValue] = useState({}) 
//     const [fileValue, setFileValue] = useState()
//     const [editorHtml, setEditorHtml] = useState(''); 
//     const [oldImage, setOldImage] = useState(''); 
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [newImage, setNewImage] = useState('');   
//     const [packageArr, setPackageArr] = useState([]) 
//     const [categoryErrMsg, setCategoryErrMsg] = useState()
//     const [packageErrMsg, setPackageErrMsg] = useState()
//     const [loading, setLoading] = useState(false) 
 
//     const getServiceFunc = async () => {  
//         const responseData = await SingleService(serviceId) 
//         if(responseData !== null && responseData !== undefined) {  
//             const {serviceName, price, discountPrice , offer, category, description, image,  } = responseData.data[0]
//             setEditorHtml(description)
//             setFormValue({serviceName, price, discountPrice , offer, category})
//             setOldImage(image) 
//             setPackageArr(responseData.data[0].package)
//         }
//         else{
//             console.log("responseData is false or error");
//         }
//     }; 
    
//     const formHandle = (e)=>{
//     const key = e.target.name
//     const value = e.target.value 
//     const lowerValue = value.toLowerCase()
//     setFormValue({...formValue, [key]:lowerValue}) 
//     }

//     const filehandle = (e)=>{
//         const file = e.target.files[0]
//         const name = e.target.name
//         setFileValue({...fileValue, [name]:file})
//         setNewImage(e.target.files[0])

//         const reader = new FileReader();
//         reader.onload = () => {
//             setSelectedImage(reader.result);
//           };
//           if (file) {
//             reader.readAsDataURL(file);
//           }

//     }

//     const handleEditorChange = (descriptionHtml) => { 
//         setEditorHtml(descriptionHtml);
//     }

//     const packageAddFunc = (e)=>{
//         const {value, checked} = e.target  
//         if(checked){
//             setPackageArr([...packageArr, value])
//         }
//         else{
//             setPackageArr(packageArr.filter((e)=>e !== value))
//         } 
//     } 
 
//     const submit = async(e)=>{
//         e.preventDefault() 
//         setLoading(true)  
//         setCategoryErrMsg("") 
//         const {serviceName, price, discountPrice, offer, category} = formValue
//         if(serviceName && price && discountPrice && offer && editorHtml ){  
//         if(!category){
//             setLoading(false)
//             return setCategoryErrMsg("Please Choose Category")  
//         }
//         if(packageArr.length < 1){
//             setLoading(false)
//             return setPackageErrMsg("Choose atleat one Package")  
//         }
    
//         try { 
//           const formData = new FormData() 
//           formData.append("category", formValue.category) 
//           formData.append("package", [...packageArr])
//           formData.append("serviceName", formValue.serviceName) 
//           formData.append("price", formValue.price) 
//           formData.append("discountPrice", formValue.discountPrice) 
//           formData.append("offer", formValue.offer)  
//           formData.append("description", editorHtml) 
//           formData.append("oldImage", oldImage)  
//           if(newImage){
//             formData.append("image", newImage) 
//           }  
//           await axios.post(`${Url}/service/update-service/${serviceId}`, formData) 
//           await dispatch(servicedata()) 
//           setLoading(false)
//           Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: ' Service Updated',
//             showConfirmButton: false,
//             timer: 1500
//           })
//           navigate('/dashboard/service')  
//         } catch (error) {
//           console.log(error);
//           setLoading(false)
//           toast.error("something wend wrong");
//         }  
//         }
//         else{
//             setLoading(false) 
//             toast.error("All fields are required");
//         }
//       }

     
     

  
//     useEffect(()=>{  
//         getServiceFunc()
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
//             Update Service
//           </Typography>  
//         </Stack> 
//       </Container>  
//       <Container className='card bg-white rounded border p-3'>
//       <section>
//         <form className="form">
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Service Name</label>
//                 <input type="text" name="serviceName" value={formValue.serviceName && formValue.serviceName} placeholder='Enter the Package Name' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)} />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Service Image</label>
//                 <input type="file" name="image" placeholder='Enter the Package Name' className='form-control addpackageinput' id="" onChange={e=>filehandle(e)} />
//                 <div className='d-flex'>
//                     <div className='me-2'>
//                         <small className='mb-0'>Old Image</small>
//                         <div className="update-service-img-box" style={{width: "50px"}} >
//                             <img src={ `${Url}/${oldImage}`} alt=""  className='w-100'/>
//                             {/* `https://teamlans.in/${oldImage}` || */}
//                         </div>
//                     </div>
//                     {selectedImage &&
//                     <div>
//                         <small className='mb-0'>new Image</small>
//                         <div className="update-service-img-box" style={{width: "50px"}} >
//                             <img src={selectedImage} alt=""  className='w-100'/> 
//                         </div>
//                     </div>
//                     }
                     
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Price  (&#x24;) </label>
//                 <input type="text" name="price" value={formValue.price && formValue.price} placeholder='Price' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Discount Price ($)</label>
//                 <input type="text" name="discountPrice" value={formValue.discountPrice && formValue.discountPrice} placeholder='Discount Price' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Extra Offer (%)</label>
//                 <input type="text" name="offer" placeholder='Offer' value={formValue.offer && formValue.offer} className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>  
            
//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">


//                 <label htmlFor="" className='me-2'>Category</label>
//                 <select name="category" id="" onChange={e=>formHandle(e)} value={formValue.category && formValue.category} className='form-select addpackageinput'>
//                   <option disabled={formValue.category}>Choose</option>
//                   {allCategory && allCategory.map((categoryData, categorIndex)=>{
//                     return(
//                       <option value={categoryData._id} key={categorIndex}>{categoryData.category}</option>
//                     )
//                   })}
//                 </select>
//                 <small><small className='text-danger'>{categoryErrMsg}</small></small> 
//               </div>
//             </div>    

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Package</label>
//                 <small><small className='text-danger'>{packageErrMsg}</small></small>
//                 <div className="d-flex flex-wrap align-items-center"> 
//                 {allPackage && allPackage.map((item, i)=>{
//                     return ( 
//                         <div className='d-flex align-item-center me-3' key={i}>
//                             <input type="checkbox" checked={packageArr.find(data => data === item._id)}   name="" id="" onChange={e=>packageAddFunc(e)} value={item._id} className='me-1 '/>
//                             <span>{item.packageName}</span> 
//                         </div>
//                     )
//                 })}
//                 </div>
//               </div>
//             </div>   

  

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

// export default UpdateServicePage







// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import { useDispatch, useSelector } from 'react-redux';
// import { Url } from 'src/url/url';
// import { servicedata } from 'src/redux/slice/service';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const UpdateServicePage = () => {
//   const { serviceId } = useParams();
//   const allCategory = useSelector(store => store.category.data) || [];
//   const allPackage = useSelector(store => store.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Basic States
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState('');
//   const [packageArr, setPackageArr] = useState([]);

//   // Image States
//   const [oldImage, setOldImage] = useState('');
//   const [newImage, setNewImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Related Works
//   const [oldRelatedWorks, setOldRelatedWorks] = useState([]);
//   const [newRelatedFiles, setNewRelatedFiles] = useState([]);

//   // Icons
//   const [allIcons, setAllIcons] = useState([]);
//   const [selectedIcons, setSelectedIcons] = useState([]);
//   const [iconSearch, setIconSearch] = useState('');

//   // Deliverables
//   const [deliverables, setDeliverables] = useState([]);
//   const [deliverableInput, setDeliverableInput] = useState('');

//   // Extra Fields
//   const [rating, setRating] = useState('');
//   const [timeline, setTimeline] = useState('');

//   // Subcategory
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Errors
//   const [errors, setErrors] = useState({});

//   // Fetch Icons Library
//   useEffect(() => {
//     axios.get(`${Url}/icons/all`)
//       .then(res => setAllIcons(res.data.data || []))
//       .catch(() => toast.error("Failed to load icons"));
//   }, []);

//   // Fetch Subcategories
//   useEffect(() => {
//     axios.get(`${Url}/subcategory/getsubcategory`)
//       .then(res => setSubcategories(res.data.data || []))
//       .catch(() => console.log("Failed to load subcategories"));
//   }, []);

//   // Fetch Service Data
//   const getServiceFunc = async () => {
//     try {
//       const res = await axios.get(`${Url}/service/single/${serviceId}`);
//       const data = res.data.data;

//       if (data) {
//         setFormValue({
//           serviceName: data.serviceName || '',
//           price: data.price || '',
//           discountPrice: data.discountPrice || '',
//           offer: data.offer || '',
//           category: data.category || '',
//           subcategory: data.subcategory || ''
//         });

//         setEditorHtml(data.description || '');
//         setOldImage(data.image || '');
//         setPackageArr(data.package || []);
//         setDeliverables(data.Deliverables || []);
//         setRating(data.rating || '');
//         setTimeline(data.TimeLine || '');
//         setOldRelatedWorks(data.relatedWorks || []);

//         // Set selected icons (array of IDs)
//         if (data.iconsFiles && data.iconsFiles.length > 0) {
//           const iconIds = data.iconsFiles.map(icon => 
//             typeof icon === 'object' ? icon._id : icon
//           );
//           setSelectedIcons(iconIds);
//         }

//         // Filter subcategories based on category
//         if (data.category) {
//           const related = subcategories.filter(sub => {
//             const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
//             return String(id) === String(data.category);
//           });
//           setFilteredSub(related);
//         }
//       }
//     } catch (err) {
//       console.log("Error fetching service:", err);
//       toast.error("Failed to load service data");
//     }
//   };

//   useEffect(() => {
//     getServiceFunc();
//   }, [serviceId, subcategories]);

//   // Handlers
//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: undefined }));
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const fileHandle = (e) => {
//     const file = e.target.files[0];
//     setNewImage(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRelatedFiles = (e) => {
//     setNewRelatedFiles(Array.from(e.target.files));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue(prev => ({ ...prev, category: catId }));
//     const related = subcategories.filter(sub => {
//       const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr(prev => [...prev, value]);
//     else setPackageArr(prev => prev.filter(x => x !== value));
//   };

//   // Icon Handlers
//   const handleIconToggle = (iconId) => {
//     setSelectedIcons(prev => {
//       if (prev.includes(iconId)) return prev.filter(id => id !== iconId);
//       return [...prev, iconId];
//     });
//   };

//   const selectAllIcons = () => setSelectedIcons(allIcons.map(icon => icon._id));
//   const deselectAllIcons = () => setSelectedIcons([]);

//   // Deliverables Handlers
//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");
//     setDeliverables(prev => [...prev, dv]);
//     setDeliverableInput('');
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables(prev => prev.filter((_, idx) => idx !== i));
//   };

//   // Remove old related work
//   const removeOldRelatedWork = (index) => {
//     setOldRelatedWorks(prev => prev.filter((_, i) => i !== index));
//   };

//   // Submit
//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const { serviceName, price, discountPrice, offer, category } = formValue;

//     if (!serviceName || !price || !category) {
//       setLoading(false);
//       return toast.error("Please fill all required fields");
//     }

//     try {
//       const formData = new FormData();

//       // Basic fields
//       formData.append("serviceName", formValue.serviceName);
//       formData.append("price", formValue.price);
//       formData.append("discountPrice", formValue.discountPrice || '');
//       formData.append("offer", formValue.offer || '');
//       formData.append("category", formValue.category);
//       formData.append("subcategory", formValue.subcategory || '');
//       formData.append("description", editorHtml);
//       formData.append("package", packageArr.join(","));

//       // Rating & Timeline
//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       // Deliverables
//       formData.append("Deliverables", JSON.stringify(deliverables));

//       // Icons
//       formData.append("iconsFiles", JSON.stringify(selectedIcons));

//       // Old image (for reference)
//       formData.append("oldImage", oldImage);

//       // Old related works (remaining after deletion)
//       formData.append("oldRelatedWorks", JSON.stringify(oldRelatedWorks));

//       // New image if selected
//       if (newImage) {
//         formData.append("image", newImage);
//       }

//       // New related works
//       newRelatedFiles.forEach(f => formData.append("relatedWorks", f));

//       const response = await axios.post(
//         `${Url}/service/update-service/${serviceId}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Updated Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.log("Update error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   // Filter icons by search
//   const filteredIcons = allIcons.filter(ic =>
//     ic.name.toLowerCase().includes(iconSearch.toLowerCase())
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Update Service</title></Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>Update Service</Typography>
//         </Stack>
//       </Container>

//       <Container className="card bg-white rounded border p-3">
//         <form onSubmit={submit}>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 value={formValue.serviceName || ''}
//                 onChange={formHandle}
//                 className="form-control"
//               />
//             </div>

//             {/* SERVICE IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input type="file" accept="image/*" className="form-control" onChange={fileHandle} />
//               <div className="d-flex gap-3 mt-2">
//                 {oldImage && (
//                   <div>
//                     <small>Old Image</small>
//                     <img src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${oldImage}`} alt="Old" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
//                   </div>
//                 )}
//                 {selectedImage && (
//                   <div>
//                     <small>New Image</small>
//                     <img src={selectedImage} alt="New" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input type="text" name="price" value={formValue.price || ''} onChange={formHandle} className="form-control" />
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input type="text" name="discountPrice" value={formValue.discountPrice || ''} onChange={formHandle} className="form-control" />
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input type="text" name="offer" value={formValue.offer || ''} onChange={formHandle} className="form-control" />
//             </div>

//             {/* CATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Category</label>
//               <select name="category" value={formValue.category || ''} onChange={handleCategoryChange} className="form-select">
//                 <option value="">Choose Category</option>
//                 {allCategory.map(c => (
//                   <option value={c._id} key={c._id}>{c.category}</option>
//                 ))}
//               </select>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select name="subcategory" value={formValue.subcategory || ''} onChange={formHandle} className="form-select">
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map(s => (
//                   <option value={s._id} key={s._id}>{s.subcategory}</option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works</label>
//               <input type="file" multiple className="form-control" onChange={handleRelatedFiles} />
              
//               {/* Old Related Works */}
//               {oldRelatedWorks.length > 0 && (
//                 <div className="mt-2">
//                   <small className="text-muted">Existing Works:</small>
//                   <div className="d-flex flex-wrap gap-2 mt-1">
//                     {oldRelatedWorks.map((url, i) => (
//                       <div key={i} style={{ position: 'relative' }}>
//                         <img
//                           src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${url}`}
//                           alt={`Work ${i}`}
//                           style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeOldRelatedWork(i)}
//                           style={{
//                             position: 'absolute', top: -8, right: -8,
//                             background: '#dc3545', color: '#fff', border: 'none',
//                             borderRadius: '50%', width: 20, height: 20, fontSize: 12, cursor: 'pointer'
//                           }}
//                         >✕</button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* New Related Works Preview */}
//               {newRelatedFiles.length > 0 && (
//                 <div className="mt-2">
//                   <small className="text-muted">New Works:</small>
//                   <div className="d-flex flex-wrap gap-2 mt-1">
//                     {newRelatedFiles.map((f, i) => (
//                       <img key={i} src={URL.createObjectURL(f)} alt={f.name} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ICON FORMATS */}
//             <div className="col-12 mb-3">
//               <label>Select Icon Formats</label>
//               <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
//                 <input
//                   type="text"
//                   placeholder="Search icons..."
//                   className="form-control"
//                   value={iconSearch}
//                   onChange={(e) => setIconSearch(e.target.value)}
//                   style={{ maxWidth: 250 }}
//                 />
//                 <button type="button" className="btn btn-sm btn-outline-primary" onClick={selectAllIcons}>Select All</button>
//                 <button type="button" className="btn btn-sm btn-outline-secondary" onClick={deselectAllIcons}>Deselect All</button>
//               </div>

//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
//                 gap: 12, padding: 12, border: '1px solid #dee2e6',
//                 borderRadius: 8, background: '#fafafa', maxHeight: 300, overflowY: 'auto'
//               }}>
//                 {filteredIcons.map(icon => {
//                   const isSelected = selectedIcons.includes(icon._id);
//                   return (
//                     <div
//                       key={icon._id}
//                       onClick={() => handleIconToggle(icon._id)}
//                       style={{
//                         padding: 8, border: `2px solid ${isSelected ? '#007bff' : '#e0e0e0'}`,
//                         borderRadius: 8, background: isSelected ? '#e7f1ff' : '#fff',
//                         cursor: 'pointer', textAlign: 'center', position: 'relative'
//                       }}
//                     >
//                       <div style={{
//                         position: 'absolute', top: 5, right: 5, width: 18, height: 18,
//                         borderRadius: 4, border: `2px solid ${isSelected ? '#007bff' : '#ccc'}`,
//                         background: isSelected ? '#007bff' : '#fff', color: '#fff', fontSize: 10,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center'
//                       }}>{isSelected && '✓'}</div>
//                       <img src={icon.iconUrl} alt={icon.name} style={{ width: '100%', height: 40, objectFit: 'contain', marginBottom: 4 }} />
//                       <div style={{ fontSize: 11 }}>{icon.name}</div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {selectedIcons.length > 0 && (
//                 <div className="mt-2 text-success" style={{ fontSize: 13 }}>
//                   <strong>{selectedIcons.length}</strong> icon(s) selected
//                 </div>
//               )}
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map(p => (
//                   <div key={p._id} className="me-3">
//                     <input
//                       type="checkbox"
//                       value={p._id}
//                       checked={packageArr.includes(p._id)}
//                       onChange={packageAddFunc}
//                     />
//                     <span className="ms-1">{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className="form-control"
//                   placeholder="Enter deliverable"
//                 />
//                 <button type="button" className="btn btn-success" onClick={addDeliverable}>+ Add</button>
//               </div>
//               <div className="d-flex flex-wrap gap-2 mt-2">
//                 {deliverables.map((d, i) => (
//                   <span key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     {d}
//                     <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" placeholder="e.g. 4.5" />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="form-control" placeholder="e.g. 3-5 days" />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//             </div>

//             {/* SUBMIT */}
//             <div className="col-12 mt-2">
//               <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
//                 {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Updating...</> : "Update Service"}
//               </button>
//             </div>

//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default UpdateServicePage;




// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import { useDispatch, useSelector } from 'react-redux';
// import { Url } from 'src/url/url';
// import { servicedata } from 'src/redux/slice/service';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const UpdateServicePage = () => {
//   const { serviceId } = useParams();
//   const allCategory = useSelector(store => store.category.data) || [];
//   const allPackage = useSelector(store => store.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Basic States
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState('');
//   const [packageArr, setPackageArr] = useState([]);

//   // Image States
//   const [oldImage, setOldImage] = useState('');
//   const [newImage, setNewImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Related Works
//   const [oldRelatedWorks, setOldRelatedWorks] = useState([]);
//   const [newRelatedFiles, setNewRelatedFiles] = useState([]);

//   // Icons
//   const [allIcons, setAllIcons] = useState([]);
//   const [selectedIcons, setSelectedIcons] = useState([]);
//   const [iconSearch, setIconSearch] = useState('');

//   // Deliverables
//   const [deliverables, setDeliverables] = useState([]);
//   const [deliverableInput, setDeliverableInput] = useState('');

//   // Extra Fields
//   const [rating, setRating] = useState('');
//   const [timeline, setTimeline] = useState('');

//   // ✅ HSN Code & Tax Percentage
//   const [hsnCode, setHsnCode] = useState('');
//   const [taxPercentage, setTaxPercentage] = useState('');

//   // Subcategory
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Errors
//   const [errors, setErrors] = useState({});

//   // Fetch Icons Library
//   useEffect(() => {
//     axios.get(`${Url}/icons/all`)
//       .then(res => setAllIcons(res.data.data || []))
//       .catch(() => toast.error("Failed to load icons"));
//   }, []);

//   // Fetch Subcategories
//   useEffect(() => {
//     axios.get(`${Url}/subcategory/getsubcategory`)
//       .then(res => setSubcategories(res.data.data || []))
//       .catch(() => console.log("Failed to load subcategories"));
//   }, []);

//   // Fetch Service Data
//   const getServiceFunc = async () => {
//     try {
//       const res = await axios.get(`${Url}/service/single/${serviceId}`);
//       const data = res.data.data;

//       if (data) {
//         setFormValue({
//           serviceName: data.serviceName || '',
//           price: data.price || '',
//           discountPrice: data.discountPrice || '',
//           offer: data.offer || '',
//           category: data.category || '',
//           subcategory: data.subcategory || ''
//         });

//         setEditorHtml(data.description || '');
//         setOldImage(data.image || '');
//         setPackageArr(data.package || []);
//         setDeliverables(data.Deliverables || []);
//         setRating(data.rating || '');
//         setTimeline(data.TimeLine || '');
//         setOldRelatedWorks(data.relatedWorks || []);

//         // ✅ Set HSN Code and Tax Percentage
//         setHsnCode(data.hsnCode || '');
//         setTaxPercentage(data.taxPercentage || '');

//         // Set selected icons (array of IDs)
//         if (data.iconsFiles && data.iconsFiles.length > 0) {
//           const iconIds = data.iconsFiles.map(icon => 
//             typeof icon === 'object' ? icon._id : icon
//           );
//           setSelectedIcons(iconIds);
//         }

//         // Filter subcategories based on category
//         if (data.category) {
//           const related = subcategories.filter(sub => {
//             const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
//             return String(id) === String(data.category);
//           });
//           setFilteredSub(related);
//         }
//       }
//     } catch (err) {
//       console.log("Error fetching service:", err);
//       toast.error("Failed to load service data");
//     }
//   };

//   useEffect(() => {
//     getServiceFunc();
//   }, [serviceId, subcategories]);

//   // Validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
//     if (!formValue.price) newErrors.price = "Price is required";
//     if (!formValue.category) newErrors.category = "Category is required";

//     // ✅ HSN Code validation
//     if (!hsnCode.trim()) {
//       newErrors.hsnCode = "HSN code is required";
//     } else if (!/^\d{4,8}$/.test(hsnCode.trim())) {
//       newErrors.hsnCode = "HSN code must be 4-8 digits";
//     }

//     // ✅ Tax Percentage validation
//     if (!taxPercentage && taxPercentage !== 0) {
//       newErrors.taxPercentage = "Tax percentage is required";
//     } else if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 100) {
//       newErrors.taxPercentage = "Tax must be between 0-100%";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handlers
//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: undefined }));
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const fileHandle = (e) => {
//     const file = e.target.files[0];
//     setNewImage(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRelatedFiles = (e) => {
//     setNewRelatedFiles(Array.from(e.target.files));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue(prev => ({ ...prev, category: catId }));
//     const related = subcategories.filter(sub => {
//       const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr(prev => [...prev, value]);
//     else setPackageArr(prev => prev.filter(x => x !== value));
//   };

//   // Icon Handlers
//   const handleIconToggle = (iconId) => {
//     setSelectedIcons(prev => {
//       if (prev.includes(iconId)) return prev.filter(id => id !== iconId);
//       return [...prev, iconId];
//     });
//   };

//   const selectAllIcons = () => setSelectedIcons(allIcons.map(icon => icon._id));
//   const deselectAllIcons = () => setSelectedIcons([]);

//   // Deliverables Handlers
//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");
//     setDeliverables(prev => [...prev, dv]);
//     setDeliverableInput('');
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables(prev => prev.filter((_, idx) => idx !== i));
//   };

//   // Remove old related work
//   const removeOldRelatedWork = (index) => {
//     setOldRelatedWorks(prev => prev.filter((_, i) => i !== index));
//   };

//   // Submit
//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields correctly");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // Basic fields
//       formData.append("serviceName", formValue.serviceName);
//       formData.append("price", formValue.price);
//       formData.append("discountPrice", formValue.discountPrice || '');
//       formData.append("offer", formValue.offer || '');
//       formData.append("category", formValue.category);
//       formData.append("subcategory", formValue.subcategory || '');
//       formData.append("description", editorHtml);
//       formData.append("package", packageArr.join(","));

//       // ✅ Add HSN Code and Tax Percentage
//       formData.append("hsnCode", hsnCode.trim());
//       formData.append("taxPercentage", taxPercentage);

//       // Rating & Timeline
//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       // Deliverables
//       formData.append("Deliverables", JSON.stringify(deliverables));

//       // Icons
//       formData.append("iconsFiles", JSON.stringify(selectedIcons));

//       // Old image (for reference)
//       formData.append("oldImage", oldImage);

//       // Old related works (remaining after deletion)
//       formData.append("oldRelatedWorks", JSON.stringify(oldRelatedWorks));

//       // New image if selected
//       if (newImage) {
//         formData.append("image", newImage);
//       }

//       // New related works
//       newRelatedFiles.forEach(f => formData.append("relatedWorks", f));

//       const response = await axios.post(
//         `${Url}/service/update-service/${serviceId}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Updated Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.log("Update error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   // Filter icons by search
//   const filteredIcons = allIcons.filter(ic =>
//     ic.name.toLowerCase().includes(iconSearch.toLowerCase())
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Update Service</title></Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>Update Service</Typography>
//         </Stack>
//       </Container>

//       <Container className="card bg-white rounded border p-3">
//         <form onSubmit={submit}>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 value={formValue.serviceName || ''}
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* SERVICE IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input type="file" accept="image/*" className="form-control" onChange={fileHandle} />
//               <div className="d-flex gap-3 mt-2">
//                 {oldImage && (
//                   <div>
//                     <small>Old Image</small>
//                     <img src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${oldImage}`} alt="Old" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
//                   </div>
//                 )}
//                 {selectedImage && (
//                   <div>
//                     <small>New Image</small>
//                     <img src={selectedImage} alt="New" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input 
//                 type="text" 
//                 name="price" 
//                 value={formValue.price || ''} 
//                 onChange={formHandle} 
//                 className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.price}</div>
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input type="text" name="discountPrice" value={formValue.discountPrice || ''} onChange={formHandle} className="form-control" />
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input type="text" name="offer" value={formValue.offer || ''} onChange={formHandle} className="form-control" />
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
//                 placeholder="e.g"
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
//                   placeholder="e.g."
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
//                 value={formValue.category || ''} 
//                 onChange={handleCategoryChange} 
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map(c => (
//                   <option value={c._id} key={c._id}>{c.category}</option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select name="subcategory" value={formValue.subcategory || ''} onChange={formHandle} className="form-select">
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map(s => (
//                   <option value={s._id} key={s._id}>{s.subcategory}</option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works</label>
//               <input type="file" multiple className="form-control" onChange={handleRelatedFiles} />
              
//               {/* Old Related Works */}
//               {oldRelatedWorks.length > 0 && (
//                 <div className="mt-2">
//                   <small className="text-muted">Existing Works:</small>
//                   <div className="d-flex flex-wrap gap-2 mt-1">
//                     {oldRelatedWorks.map((url, i) => (
//                       <div key={i} style={{ position: 'relative' }}>
//                         <img
//                           src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${url}`}
//                           alt={`Work ${i}`}
//                           style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeOldRelatedWork(i)}
//                           style={{
//                             position: 'absolute', top: -8, right: -8,
//                             background: '#dc3545', color: '#fff', border: 'none',
//                             borderRadius: '50%', width: 20, height: 20, fontSize: 12, cursor: 'pointer'
//                           }}
//                         >✕</button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* New Related Works Preview */}
//               {newRelatedFiles.length > 0 && (
//                 <div className="mt-2">
//                   <small className="text-muted">New Works:</small>
//                   <div className="d-flex flex-wrap gap-2 mt-1">
//                     {newRelatedFiles.map((f, i) => (
//                       <img key={i} src={URL.createObjectURL(f)} alt={f.name} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ICON FORMATS */}
//             <div className="col-12 mb-3">
//               <label>Select Icon Formats</label>
//               <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
//                 <input
//                   type="text"
//                   placeholder="Search icons..."
//                   className="form-control"
//                   value={iconSearch}
//                   onChange={(e) => setIconSearch(e.target.value)}
//                   style={{ maxWidth: 250 }}
//                 />
//                 <button type="button" className="btn btn-sm btn-outline-primary" onClick={selectAllIcons}>Select All</button>
//                 <button type="button" className="btn btn-sm btn-outline-secondary" onClick={deselectAllIcons}>Deselect All</button>
//               </div>

//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
//                 gap: 12, padding: 12, border: '1px solid #dee2e6',
//                 borderRadius: 8, background: '#fafafa', maxHeight: 300, overflowY: 'auto'
//               }}>
//                 {filteredIcons.map(icon => {
//                   const isSelected = selectedIcons.includes(icon._id);
//                   return (
//                     <div
//                       key={icon._id}
//                       onClick={() => handleIconToggle(icon._id)}
//                       style={{
//                         padding: 8, border: `2px solid ${isSelected ? '#007bff' : '#e0e0e0'}`,
//                         borderRadius: 8, background: isSelected ? '#e7f1ff' : '#fff',
//                         cursor: 'pointer', textAlign: 'center', position: 'relative'
//                       }}
//                     >
//                       <div style={{
//                         position: 'absolute', top: 5, right: 5, width: 18, height: 18,
//                         borderRadius: 4, border: `2px solid ${isSelected ? '#007bff' : '#ccc'}`,
//                         background: isSelected ? '#007bff' : '#fff', color: '#fff', fontSize: 10,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center'
//                       }}>{isSelected && '✓'}</div>
//                       <img src={icon.iconUrl} alt={icon.name} style={{ width: '100%', height: 40, objectFit: 'contain', marginBottom: 4 }} />
//                       <div style={{ fontSize: 11 }}>{icon.name}</div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {selectedIcons.length > 0 && (
//                 <div className="mt-2 text-success" style={{ fontSize: 13 }}>
//                   <strong>{selectedIcons.length}</strong> icon(s) selected
//                 </div>
//               )}
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map(p => (
//                   <div key={p._id} className="me-3">
//                     <input
//                       type="checkbox"
//                       value={p._id}
//                       checked={packageArr.includes(p._id)}
//                       onChange={packageAddFunc}
//                     />
//                     <span className="ms-1">{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className="form-control"
//                   placeholder="Enter deliverable"
//                 />
//                 <button type="button" className="btn btn-success" onClick={addDeliverable}>+ Add</button>
//               </div>
//               <div className="d-flex flex-wrap gap-2 mt-2">
//                 {deliverables.map((d, i) => (
//                   <span key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     {d}
//                     <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" placeholder="e.g. 4.5" />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="form-control" placeholder="e.g. 3-5 days" />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//             </div>

//             {/* SUBMIT */}
//             <div className="col-12 mt-2">
//               <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
//                 {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Updating...</> : "Update Service"}
//               </button>
//             </div>

//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default UpdateServicePage;






// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Container, Stack, Typography } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import { useDispatch, useSelector } from 'react-redux';
// import { Url } from 'src/url/url';
// import { servicedata } from 'src/redux/slice/service';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const UpdateServicePage = () => {
//   const { serviceId } = useParams();
//   const allCategory = useSelector(store => store.category.data) || [];
//   const allPackage = useSelector(store => store.package.data) || [];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Basic States
//   const [loading, setLoading] = useState(false);
//   const [formValue, setFormValue] = useState({});
//   const [editorHtml, setEditorHtml] = useState('');
//   const [packageArr, setPackageArr] = useState([]);

//   // Image States
//   const [oldImage, setOldImage] = useState('');
//   const [newImage, setNewImage] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Related Works
//   const [oldRelatedWorks, setOldRelatedWorks] = useState([]);
//   const [newRelatedFiles, setNewRelatedFiles] = useState([]);

//   // Icons
//   const [allIcons, setAllIcons] = useState([]);
//   const [selectedIcons, setSelectedIcons] = useState([]);
//   const [iconSearch, setIconSearch] = useState('');

//   // Deliverables
//   const [deliverables, setDeliverables] = useState([]);
//   const [deliverableInput, setDeliverableInput] = useState('');

//   // Extra Fields
//   const [rating, setRating] = useState('');
//   const [timeline, setTimeline] = useState('');

//   // ✅ SAC Code & Tax Percentage (CHANGED FROM HSN)
//   const [sacCode, setSacCode] = useState('');
//   const [taxPercentage, setTaxPercentage] = useState('');

//   // Subcategory
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSub, setFilteredSub] = useState([]);

//   // Errors
//   const [errors, setErrors] = useState({});

//   // Fetch Icons Library
//   useEffect(() => {
//     axios.get(`${Url}/icons/all`)
//       .then(res => setAllIcons(res.data.data || []))
//       .catch(() => toast.error("Failed to load icons"));
//   }, []);

//   // Fetch Subcategories
//   useEffect(() => {
//     axios.get(`${Url}/subcategory/getsubcategory`)
//       .then(res => setSubcategories(res.data.data || []))
//       .catch(() => console.log("Failed to load subcategories"));
//   }, []);

//   // Fetch Service Data
//   const getServiceFunc = async () => {
//     try {
//       const res = await axios.get(`${Url}/service/single/${serviceId}`);
//       const data = res.data.data;

//       if (data) {
//         setFormValue({
//           serviceName: data.serviceName || '',
//           price: data.price || '',
//           discountPrice: data.discountPrice || '',
//           offer: data.offer || '',
//           category: data.category || '',
//           subcategory: data.subcategory || ''
//         });

//         setEditorHtml(data.description || '');
//         setOldImage(data.image || '');
//         setPackageArr(data.package || []);
//         setDeliverables(data.Deliverables || []);
//         setRating(data.rating || '');
//         setTimeline(data.TimeLine || '');
//         setOldRelatedWorks(data.relatedWorks || []);

//         // ✅ Set SAC Code and Tax Percentage (CHANGED FROM HSN)
//         setSacCode(data.sacCode || '');
//         setTaxPercentage(data.taxPercentage || '');

//         // Set selected icons (array of IDs)
//         if (data.iconsFiles && data.iconsFiles.length > 0) {
//           const iconIds = data.iconsFiles.map(icon => 
//             typeof icon === 'object' ? icon._id : icon
//           );
//           setSelectedIcons(iconIds);
//         }

//         // Filter subcategories based on category
//         if (data.category) {
//           const related = subcategories.filter(sub => {
//             const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
//             return String(id) === String(data.category);
//           });
//           setFilteredSub(related);
//         }
//       }
//     } catch (err) {
//       console.log("Error fetching service:", err);
//       toast.error("Failed to load service data");
//     }
//   };

//   useEffect(() => {
//     getServiceFunc();
//   }, [serviceId, subcategories]);

//   // Validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValue.serviceName) newErrors.serviceName = "Service name is required";
//     if (!formValue.price) newErrors.price = "Price is required";
//     if (!formValue.category) newErrors.category = "Category is required";

//     // ✅ SAC Code validation (6 digits for services)
//     if (!sacCode.trim()) {
//       newErrors.sacCode = "SAC code is required";
//     } else if (!/^\d{6}$/.test(sacCode.trim())) {
//       newErrors.sacCode = "SAC code must be 6 digits";
//     }

//     // ✅ Tax Percentage validation
//     if (!taxPercentage && taxPercentage !== 0) {
//       newErrors.taxPercentage = "Tax percentage is required";
//     } else if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 100) {
//       newErrors.taxPercentage = "Tax must be between 0-100%";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handlers
//   const formHandle = (e) => {
//     const { name, value } = e.target;
//     setFormValue(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: undefined }));
//   };

//   const handleEditorChange = (html) => setEditorHtml(html);

//   const fileHandle = (e) => {
//     const file = e.target.files[0];
//     setNewImage(file);
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRelatedFiles = (e) => {
//     setNewRelatedFiles(Array.from(e.target.files));
//   };

//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setFormValue(prev => ({ ...prev, category: catId }));
//     const related = subcategories.filter(sub => {
//       const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
//       return String(id) === String(catId);
//     });
//     setFilteredSub(related);
//   };

//   const packageAddFunc = (e) => {
//     const { value, checked } = e.target;
//     if (checked) setPackageArr(prev => [...prev, value]);
//     else setPackageArr(prev => prev.filter(x => x !== value));
//   };

//   // Icon Handlers
//   const handleIconToggle = (iconId) => {
//     setSelectedIcons(prev => {
//       if (prev.includes(iconId)) return prev.filter(id => id !== iconId);
//       return [...prev, iconId];
//     });
//   };

//   const selectAllIcons = () => setSelectedIcons(allIcons.map(icon => icon._id));
//   const deselectAllIcons = () => setSelectedIcons([]);

//   // Deliverables Handlers
//   const addDeliverable = () => {
//     const dv = deliverableInput.trim();
//     if (!dv) return toast.error("Enter deliverable first");
//     setDeliverables(prev => [...prev, dv]);
//     setDeliverableInput('');
//   };

//   const removeDeliverable = (i) => {
//     setDeliverables(prev => prev.filter((_, idx) => idx !== i));
//   };

//   // Remove old related work
//   const removeOldRelatedWork = (index) => {
//     setOldRelatedWorks(prev => prev.filter((_, i) => i !== index));
//   };

//   // Submit
//   const submit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all required fields correctly");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // Basic fields
//       formData.append("serviceName", formValue.serviceName);
//       formData.append("price", formValue.price);
//       formData.append("discountPrice", formValue.discountPrice || '');
//       formData.append("offer", formValue.offer || '');
//       formData.append("category", formValue.category);
//       formData.append("subcategory", formValue.subcategory || '');
//       formData.append("description", editorHtml);
//       formData.append("package", packageArr.join(","));

//       // ✅ Add SAC Code and Tax Percentage (CHANGED FROM HSN)
//       formData.append("sacCode", sacCode.trim());
//       formData.append("taxPercentage", taxPercentage);

//       // Rating & Timeline
//       if (rating) formData.append("rating", rating);
//       if (timeline) formData.append("TimeLine", timeline);

//       // Deliverables
//       formData.append("Deliverables", JSON.stringify(deliverables));

//       // Icons
//       formData.append("iconsFiles", JSON.stringify(selectedIcons));

//       // Old image (for reference)
//       formData.append("oldImage", oldImage);

//       // Old related works (remaining after deletion)
//       formData.append("oldRelatedWorks", JSON.stringify(oldRelatedWorks));

//       // New image if selected
//       if (newImage) {
//         formData.append("image", newImage);
//       }

//       // New related works
//       newRelatedFiles.forEach(f => formData.append("relatedWorks", f));

//       const response = await axios.post(
//         `${Url}/service/update-service/${serviceId}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data.success) {
//         Swal.fire({
//           icon: "success",
//           title: "Service Updated Successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         dispatch(servicedata());
//         navigate("/dashboard/service");
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.log("Update error:", err);
//       toast.error(err.response?.data?.message || "Server error");
//     }

//     setLoading(false);
//   };

//   // Filter icons by search
//   const filteredIcons = allIcons.filter(ic =>
//     ic.name.toLowerCase().includes(iconSearch.toLowerCase())
//   );

//   return (
//     <>
//       <ToastContainer />
//       <Helmet><title>Update Service</title></Helmet>

//       <Container>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
//           <Typography variant="h4" gutterBottom>Update Service</Typography>
//         </Stack>
//       </Container>

//       <Container className="card bg-white rounded border p-3">
//         <form onSubmit={submit}>
//           <div className="row">

//             {/* SERVICE NAME */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Name</label>
//               <input
//                 type="text"
//                 name="serviceName"
//                 value={formValue.serviceName || ''}
//                 onChange={formHandle}
//                 className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.serviceName}</div>
//             </div>

//             {/* SERVICE IMAGE */}
//             <div className="col-lg-6 mb-2">
//               <label>Service Image</label>
//               <input type="file" accept="image/*" className="form-control" onChange={fileHandle} />
//               <div className="d-flex gap-3 mt-2">
//                 {oldImage && (
//                   <div>
//                     <small>Old Image</small>
//                     <img src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${oldImage}`} alt="Old" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
//                   </div>
//                 )}
//                 {selectedImage && (
//                   <div>
//                     <small>New Image</small>
//                     <img src={selectedImage} alt="New" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* PRICE */}
//             <div className="col-lg-4 mb-2">
//               <label>Price ($)</label>
//               <input 
//                 type="text" 
//                 name="price" 
//                 value={formValue.price || ''} 
//                 onChange={formHandle} 
//                 className={`form-control ${errors.price ? 'is-invalid' : ''}`}
//               />
//               <div className="invalid-feedback">{errors.price}</div>
//             </div>

//             {/* DISCOUNT */}
//             <div className="col-lg-4 mb-2">
//               <label>Discount Price ($)</label>
//               <input type="text" name="discountPrice" value={formValue.discountPrice || ''} onChange={formHandle} className="form-control" />
//             </div>

//             {/* OFFER */}
//             <div className="col-lg-4 mb-2">
//               <label>Offer (%)</label>
//               <input type="text" name="offer" value={formValue.offer || ''} onChange={formHandle} className="form-control" />
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
//               <small className="text-muted">Enter 6-digit SAC code for service classification</small>
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
//                 value={formValue.category || ''} 
//                 onChange={handleCategoryChange} 
//                 className={`form-select ${errors.category ? 'is-invalid' : ''}`}
//               >
//                 <option value="">Choose Category</option>
//                 {allCategory.map(c => (
//                   <option value={c._id} key={c._id}>{c.category}</option>
//                 ))}
//               </select>
//               <div className="invalid-feedback">{errors.category}</div>
//             </div>

//             {/* SUBCATEGORY */}
//             <div className="col-lg-6 mb-3">
//               <label>Subcategory</label>
//               <select name="subcategory" value={formValue.subcategory || ''} onChange={formHandle} className="form-select">
//                 <option value="">Choose Subcategory</option>
//                 {filteredSub.map(s => (
//                   <option value={s._id} key={s._id}>{s.subcategory}</option>
//                 ))}
//               </select>
//             </div>

//             {/* RELATED WORKS */}
//             <div className="col-12 mb-3">
//               <label>Related Works</label>
//               <input type="file" multiple className="form-control" onChange={handleRelatedFiles} />
              
//               {/* Old Related Works */}
//               {oldRelatedWorks.length > 0 && (
//                 <div className="mt-2">
//                   <small className="text-muted">Existing Works:</small>
//                   <div className="d-flex flex-wrap gap-2 mt-1">
//                     {oldRelatedWorks.map((url, i) => (
//                       <div key={i} style={{ position: 'relative' }}>
//                         <img
//                           src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${url}`}
//                           alt={`Work ${i}`}
//                           style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeOldRelatedWork(i)}
//                           style={{
//                             position: 'absolute', top: -8, right: -8,
//                             background: '#dc3545', color: '#fff', border: 'none',
//                             borderRadius: '50%', width: 20, height: 20, fontSize: 12, cursor: 'pointer'
//                           }}
//                         >✕</button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* New Related Works Preview */}
//               {newRelatedFiles.length > 0 && (
//                 <div className="mt-2">
//                   <small className="text-muted">New Works:</small>
//                   <div className="d-flex flex-wrap gap-2 mt-1">
//                     {newRelatedFiles.map((f, i) => (
//                       <img key={i} src={URL.createObjectURL(f)} alt={f.name} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ICON FORMATS */}
//             <div className="col-12 mb-3">
//               <label>Select Icon Formats</label>
//               <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
//                 <input
//                   type="text"
//                   placeholder="Search icons..."
//                   className="form-control"
//                   value={iconSearch}
//                   onChange={(e) => setIconSearch(e.target.value)}
//                   style={{ maxWidth: 250 }}
//                 />
//                 <button type="button" className="btn btn-sm btn-outline-primary" onClick={selectAllIcons}>Select All</button>
//                 <button type="button" className="btn btn-sm btn-outline-secondary" onClick={deselectAllIcons}>Deselect All</button>
//               </div>

//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
//                 gap: 12, padding: 12, border: '1px solid #dee2e6',
//                 borderRadius: 8, background: '#fafafa', maxHeight: 300, overflowY: 'auto'
//               }}>
//                 {filteredIcons.map(icon => {
//                   const isSelected = selectedIcons.includes(icon._id);
//                   return (
//                     <div
//                       key={icon._id}
//                       onClick={() => handleIconToggle(icon._id)}
//                       style={{
//                         padding: 8, border: `2px solid ${isSelected ? '#007bff' : '#e0e0e0'}`,
//                         borderRadius: 8, background: isSelected ? '#e7f1ff' : '#fff',
//                         cursor: 'pointer', textAlign: 'center', position: 'relative'
//                       }}
//                     >
//                       <div style={{
//                         position: 'absolute', top: 5, right: 5, width: 18, height: 18,
//                         borderRadius: 4, border: `2px solid ${isSelected ? '#007bff' : '#ccc'}`,
//                         background: isSelected ? '#007bff' : '#fff', color: '#fff', fontSize: 10,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center'
//                       }}>{isSelected && '✓'}</div>
//                       <img src={icon.iconUrl} alt={icon.name} style={{ width: '100%', height: 40, objectFit: 'contain', marginBottom: 4 }} />
//                       <div style={{ fontSize: 11 }}>{icon.name}</div>
//                     </div>
//                   );
//                 })}
//               </div>
//               {selectedIcons.length > 0 && (
//                 <div className="mt-2 text-success" style={{ fontSize: 13 }}>
//                   <strong>{selectedIcons.length}</strong> icon(s) selected
//                 </div>
//               )}
//             </div>

//             {/* PACKAGES */}
//             <div className="col-12 mb-3">
//               <label>Package</label>
//               <div className="d-flex flex-wrap">
//                 {allPackage.map(p => (
//                   <div key={p._id} className="me-3">
//                     <input
//                       type="checkbox"
//                       value={p._id}
//                       checked={packageArr.includes(p._id)}
//                       onChange={packageAddFunc}
//                     />
//                     <span className="ms-1">{p.packageName}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* DELIVERABLES */}
//             <div className="col-12 mb-3">
//               <label>Deliverables</label>
//               <div className="d-flex gap-2">
//                 <input
//                   value={deliverableInput}
//                   onChange={(e) => setDeliverableInput(e.target.value)}
//                   className="form-control"
//                   placeholder="Enter deliverable"
//                 />
//                 <button type="button" className="btn btn-success" onClick={addDeliverable}>+ Add</button>
//               </div>
//               <div className="d-flex flex-wrap gap-2 mt-2">
//                 {deliverables.map((d, i) => (
//                   <span key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
//                     {d}
//                     <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* RATING */}
//             <div className="col-lg-6 mb-3">
//               <label>Rating</label>
//               <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" placeholder="e.g. 4.5" />
//             </div>

//             {/* TIMELINE */}
//             <div className="col-lg-6 mb-3">
//               <label>TimeLine</label>
//               <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="form-control" placeholder="e.g. 3-5 days" />
//             </div>

//             {/* DESCRIPTION */}
//             <div className="col-12 mb-3">
//               <label>Description</label>
//               <ReactQuill value={editorHtml} onChange={handleEditorChange} />
//             </div>

//             {/* SUBMIT */}
//             <div className="col-12 mt-2">
//               <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
//                 {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Updating...</> : "Update Service"}
//               </button>
//             </div>

//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default UpdateServicePage;







import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { Url } from 'src/url/url';
import { servicedata } from 'src/redux/slice/service';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateServicePage = () => {
  const { serviceId } = useParams();
  const allCategory = useSelector(store => store.category.data) || [];
  const allPackage = useSelector(store => store.package.data) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Basic States
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [editorHtml, setEditorHtml] = useState('');
  const [packageArr, setPackageArr] = useState([]);

  // Image States
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Related Works
  const [oldRelatedWorks, setOldRelatedWorks] = useState([]);
  const [newRelatedFiles, setNewRelatedFiles] = useState([]);

  // Icons
  const [allIcons, setAllIcons] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [iconSearch, setIconSearch] = useState('');

  // Deliverables
  const [deliverables, setDeliverables] = useState([]);
  const [deliverableInput, setDeliverableInput] = useState('');

  // Extra Fields
  const [rating, setRating] = useState('');
  const [timeline, setTimeline] = useState('');

  // ✅ CLEAR PRICING FIELDS (MATCHING DATABASE)
  const [basePrice, setBasePrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [price, setPrice] = useState('');

  // SAC Code & Tax Percentage
  const [sacCode, setSacCode] = useState('');
  const [taxPercentage, setTaxPercentage] = useState('');

  // Subcategory
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSub, setFilteredSub] = useState([]);

  // Errors
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
      setPrice('');
    }
  }, [basePrice, discount]);

  // Fetch Icons Library
  useEffect(() => {
    axios.get(`${Url}/icons/all`)
      .then(res => setAllIcons(res.data.data || []))
      .catch(() => toast.error("Failed to load icons"));
  }, []);

  // Fetch Subcategories
  useEffect(() => {
    axios.get(`${Url}/subcategory/getsubcategory`)
      .then(res => setSubcategories(res.data.data || []))
      .catch(() => console.log("Failed to load subcategories"));
  }, []);

  // Fetch Service Data
  const getServiceFunc = async () => {
    try {
      const res = await axios.get(`${Url}/service/single/${serviceId}`);
      const data = res.data.data;

      if (data) {
        setFormValue({
          serviceName: data.serviceName || '',
          category: data.category || '',
          subcategory: data.subcategory || ''
        });

        // ✅ Set CLEAR pricing fields
        setBasePrice(data.basePrice || '');
        setDiscount(data.discount || '');
        setPrice(data.price || '');

        setEditorHtml(data.description || '');
        setOldImage(data.image || '');
        setPackageArr(data.package || []);
        setDeliverables(data.Deliverables || []);
        setRating(data.rating || '');
        setTimeline(data.TimeLine || '');
        setOldRelatedWorks(data.relatedWorks || []);

        // Set SAC Code and Tax Percentage
        setSacCode(data.sacCode || '');
        setTaxPercentage(data.taxPercentage || '');

        // Set selected icons (array of IDs)
        if (data.iconsFiles && data.iconsFiles.length > 0) {
          const iconIds = data.iconsFiles.map(icon => 
            typeof icon === 'object' ? icon._id : icon
          );
          setSelectedIcons(iconIds);
        }

        // Filter subcategories based on category
        if (data.category) {
          const related = subcategories.filter(sub => {
            const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
            return String(id) === String(data.category);
          });
          setFilteredSub(related);
        }
      }
    } catch (err) {
      console.log("Error fetching service:", err);
      toast.error("Failed to load service data");
    }
  };

  useEffect(() => {
    getServiceFunc();
  }, [serviceId, subcategories]);

  // Validation
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

    // SAC Code validation
    if (!sacCode.trim()) {
      newErrors.sacCode = "SAC code is required";
    } else if (!/^\d{6}$/.test(sacCode.trim())) {
      newErrors.sacCode = "SAC code must be 6 digits";
    }

    // Tax Percentage validation
    if (!taxPercentage && taxPercentage !== 0) {
      newErrors.taxPercentage = "Tax percentage is required";
    } else if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 100) {
      newErrors.taxPercentage = "Tax must be between 0-100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const formHandle = (e) => {
    const { name, value } = e.target;
    setFormValue(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleEditorChange = (html) => setEditorHtml(html);

  const fileHandle = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRelatedFiles = (e) => {
    setNewRelatedFiles(Array.from(e.target.files));
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setFormValue(prev => ({ ...prev, category: catId }));
    const related = subcategories.filter(sub => {
      const id = typeof sub.categoryId === 'object' ? sub.categoryId._id : sub.categoryId;
      return String(id) === String(catId);
    });
    setFilteredSub(related);
  };

  const packageAddFunc = (e) => {
    const { value, checked } = e.target;
    if (checked) setPackageArr(prev => [...prev, value]);
    else setPackageArr(prev => prev.filter(x => x !== value));
  };

  // Icon Handlers
  const handleIconToggle = (iconId) => {
    setSelectedIcons(prev => {
      if (prev.includes(iconId)) return prev.filter(id => id !== iconId);
      return [...prev, iconId];
    });
  };

  const selectAllIcons = () => setSelectedIcons(allIcons.map(icon => icon._id));
  const deselectAllIcons = () => setSelectedIcons([]);

  // Deliverables Handlers
  const addDeliverable = () => {
    const dv = deliverableInput.trim();
    if (!dv) return toast.error("Enter deliverable first");
    setDeliverables(prev => [...prev, dv]);
    setDeliverableInput('');
  };

  const removeDeliverable = (i) => {
    setDeliverables(prev => prev.filter((_, idx) => idx !== i));
  };

  // Remove old related work
  const removeOldRelatedWork = (index) => {
    setOldRelatedWorks(prev => prev.filter((_, i) => i !== index));
  };

  // Submit
  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Basic fields
      formData.append("serviceName", formValue.serviceName);
      
      // ✅ CLEAR PRICING FIELDS
      formData.append("basePrice", basePrice);
      formData.append("discount", discount || '0');
      formData.append("price", price);
      
      formData.append("category", formValue.category);
      formData.append("subcategory", formValue.subcategory || '');
      formData.append("description", editorHtml);
      formData.append("package", packageArr.join(","));

      // Add SAC Code and Tax Percentage
      formData.append("sacCode", sacCode.trim());
      formData.append("taxPercentage", taxPercentage);

      // Rating & Timeline
      if (rating) formData.append("rating", rating);
      if (timeline) formData.append("TimeLine", timeline);

      // Deliverables
      formData.append("Deliverables", JSON.stringify(deliverables));

      // Icons
      formData.append("iconsFiles", JSON.stringify(selectedIcons));

      // Old image (for reference)
      formData.append("oldImage", oldImage);

      // Old related works (remaining after deletion)
      formData.append("oldRelatedWorks", JSON.stringify(oldRelatedWorks));

      // New image if selected
      if (newImage) {
        formData.append("image", newImage);
      }

      // New related works
      newRelatedFiles.forEach(f => formData.append("relatedWorks", f));

      const response = await axios.post(
        `${Url}/service/update-service/${serviceId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Service Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(servicedata());
        navigate("/dashboard/service");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log("Update error:", err);
      toast.error(err.response?.data?.message || "Server error");
    }

    setLoading(false);
  };

  // Filter icons by search
  const filteredIcons = allIcons.filter(ic =>
    ic.name.toLowerCase().includes(iconSearch.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <Helmet><title>Update Service</title></Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>Update Service</Typography>
        </Stack>
      </Container>

      <Container className="card bg-white rounded border p-3">
        <form onSubmit={submit}>
          <div className="row">

            {/* SERVICE NAME */}
            <div className="col-lg-6 mb-2">
              <label>Service Name</label>
              <input
                type="text"
                name="serviceName"
                value={formValue.serviceName || ''}
                onChange={formHandle}
                className={`form-control ${errors.serviceName ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.serviceName}</div>
            </div>

            {/* SERVICE IMAGE */}
            <div className="col-lg-6 mb-2">
              <label>Service Image</label>
              <input type="file" accept="image/*" className="form-control" onChange={fileHandle} />
              <div className="d-flex gap-3 mt-2">
                {oldImage && (
                  <div>
                    <small>Old Image</small>
                    <img src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${oldImage}`} alt="Old" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                  </div>
                )}
                {selectedImage && (
                  <div>
                    <small>New Image</small>
                    <img src={selectedImage} alt="New" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                  </div>
                )}
              </div>
            </div>

            {/* ✅ BASE PRICE */}
            <div className="col-lg-4 mb-2">
              <label>Base Price ($)</label>
              <input
                type="text"
                value={basePrice}
                onChange={(e) => {
                  setBasePrice(e.target.value);
                  setErrors(prev => ({ ...prev, basePrice: undefined }));
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
                  setErrors(prev => ({ ...prev, discount: undefined }));
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
              <small className="text-muted">Enter 6-digit SAC code for service classification</small>
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
                value={formValue.category || ''} 
                onChange={handleCategoryChange} 
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              >
                <option value="">Choose Category</option>
                {allCategory.map(c => (
                  <option value={c._id} key={c._id}>{c.category}</option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.category}</div>
            </div>

            {/* SUBCATEGORY */}
            <div className="col-lg-6 mb-3">
              <label>Subcategory</label>
              <select name="subcategory" value={formValue.subcategory || ''} onChange={formHandle} className="form-select">
                <option value="">Choose Subcategory</option>
                {filteredSub.map(s => (
                  <option value={s._id} key={s._id}>{s.subcategory}</option>
                ))}
              </select>
            </div>

            {/* RELATED WORKS */}
            <div className="col-12 mb-3">
              <label>Related Works</label>
              <input type="file" multiple className="form-control" onChange={handleRelatedFiles} />
              
              {/* Old Related Works */}
              {oldRelatedWorks.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">Existing Works:</small>
                  <div className="d-flex flex-wrap gap-2 mt-1">
                    {oldRelatedWorks.map((url, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img
                          src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${url}`}
                          alt={`Work ${i}`}
                          style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeOldRelatedWork(i)}
                          style={{
                            position: 'absolute', top: -8, right: -8,
                            background: '#dc3545', color: '#fff', border: 'none',
                            borderRadius: '50%', width: 20, height: 20, fontSize: 12, cursor: 'pointer'
                          }}
                        >✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Related Works Preview */}
              {newRelatedFiles.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">New Works:</small>
                  <div className="d-flex flex-wrap gap-2 mt-1">
                    {newRelatedFiles.map((f, i) => (
                      <img key={i} src={URL.createObjectURL(f)} alt={f.name} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6 }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ICON FORMATS */}
            <div className="col-12 mb-3">
              <label>Select Icon Formats</label>
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Search icons..."
                  className="form-control"
                  value={iconSearch}
                  onChange={(e) => setIconSearch(e.target.value)}
                  style={{ maxWidth: 250 }}
                />
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={selectAllIcons}>Select All</button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={deselectAllIcons}>Deselect All</button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                gap: 12, padding: 12, border: '1px solid #dee2e6',
                borderRadius: 8, background: '#fafafa', maxHeight: 300, overflowY: 'auto'
              }}>
                {filteredIcons.map(icon => {
                  const isSelected = selectedIcons.includes(icon._id);
                  return (
                    <div
                      key={icon._id}
                      onClick={() => handleIconToggle(icon._id)}
                      style={{
                        padding: 8, border: `2px solid ${isSelected ? '#007bff' : '#e0e0e0'}`,
                        borderRadius: 8, background: isSelected ? '#e7f1ff' : '#fff',
                        cursor: 'pointer', textAlign: 'center', position: 'relative'
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: 5, right: 5, width: 18, height: 18,
                        borderRadius: 4, border: `2px solid ${isSelected ? '#007bff' : '#ccc'}`,
                        background: isSelected ? '#007bff' : '#fff', color: '#fff', fontSize: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>{isSelected && '✓'}</div>
                      <img src={icon.iconUrl} alt={icon.name} style={{ width: '100%', height: 40, objectFit: 'contain', marginBottom: 4 }} />
                      <div style={{ fontSize: 11 }}>{icon.name}</div>
                    </div>
                  );
                })}
              </div>
              {selectedIcons.length > 0 && (
                <div className="mt-2 text-success" style={{ fontSize: 13 }}>
                  <strong>{selectedIcons.length}</strong> icon(s) selected
                </div>
              )}
            </div>

            {/* PACKAGES */}
            <div className="col-12 mb-3">
              <label>Package</label>
              <div className="d-flex flex-wrap">
                {/* ✅ STATIC CUSTOM SERVICE OPTION */}
                <div className="me-3">
                  <input
                    type="checkbox"
                    value="custom-service"
                    checked={packageArr.includes("custom-service")}
                    onChange={packageAddFunc}
                  />
                  <span className="ms-1" style={{ fontWeight: 500 }}>Custom Service</span>
                </div>
                
                {/* DYNAMIC PACKAGES */}
                {allPackage.map(p => (
                  <div key={p._id} className="me-3">
                    <input
                      type="checkbox"
                      value={p._id}
                      checked={packageArr.includes(p._id)}
                      onChange={packageAddFunc}
                    />
                    <span className="ms-1">{p.packageName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERABLES */}
            <div className="col-12 mb-3">
              <label>Deliverables</label>
              <div className="d-flex gap-2">
                <input
                  value={deliverableInput}
                  onChange={(e) => setDeliverableInput(e.target.value)}
                  className="form-control"
                  placeholder="Enter deliverable"
                />
                <button type="button" className="btn btn-success" onClick={addDeliverable}>+ Add</button>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {deliverables.map((d, i) => (
                  <span key={i} style={{ background: '#e9f2ff', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {d}
                    <button type="button" onClick={() => removeDeliverable(i)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>✕</button>
                  </span>
                ))}
              </div>
            </div>

            {/* RATING */}
            <div className="col-lg-6 mb-3">
              <label>Rating</label>
              <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" placeholder="e.g. 4.5" />
            </div>

            {/* TIMELINE */}
            <div className="col-lg-6 mb-3">
              <label>TimeLine</label>
              <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="form-control" placeholder="e.g. 3-5 days" />
            </div>

            {/* DESCRIPTION */}
            <div className="col-12 mb-3">
              <label>Description</label>
              <ReactQuill value={editorHtml} onChange={handleEditorChange} />
            </div>

            {/* SUBMIT */}
            <div className="col-12 mt-2">
              <button type="submit" disabled={loading} className="btn btn-primary w-100" style={{ padding: 12 }}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Updating...</> : "Update Service"}
              </button>
            </div>

          </div>
        </form>
      </Container>
    </>
  );
};

export default UpdateServicePage;