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
// import { useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { blogdata } from 'src/redux/slice/blog';


// const UpdateBlog = () => {  
//     // const allBlogData = useSelector(store => store.blog.data)  
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const {blogId} = useParams()

//   const [loading, setLoading] = useState(false) 
//   const [formValue, setFormValue] = useState({})  
//   const [fileValue, setFileValue] = useState({})
//   const [editorHtml, setEditorHtml] = useState('');
//   const [oldImage, setOldImage] = useState('');

//   const handleEditorChange = (descriptionHtml) => { 
//     setEditorHtml(descriptionHtml);
//   }

//   const formHandle = (e)=>{
//     const key = e.target.name
//     const value = e.target.value 
//     const lowerValue = value.toLowerCase()
//     setFormValue({...formValue, [key]:lowerValue}) 
//   }

//   const fileHandle = (e)=>{
//     const file = e.target.files[0]
//     const name = e.target.name
//     setFileValue({...fileValue, [name]:file})
// }

//   const submit = async(e)=>{
//     e.preventDefault() 
//     setLoading(true)   
//     const {title, shortDescription, imageAlt,  slug} = formValue 
//     if(title && shortDescription && imageAlt &&  slug){   
//     try { 
//       const formData = new FormData() 
//       formData.append("title", formValue.title)  
//       formData.append("slug", formValue.slug) 
//       formData.append("imageAlt", formValue.imageAlt) 
//       formData.append("shortDescription", formValue.shortDescription)  
//       formData.append("description", editorHtml)   
//       if (fileValue.blogImage) { 
//           formData.append("blogImage", fileValue.blogImage)   
//         }
//         formData.append("oldImage", oldImage)    
//       await axios.post(`${Url}/blog/update/${blogId}`, formData)  
//       await dispatch(blogdata()) 
//       setLoading(false)
//       navigate('/dashboard/blog') 
//       Swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'New Service Added',
//         showConfirmButton: false,
//         timer: 1500
//       }) 
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
 
//    const getBlogFunc = async () => {  
//         const responseData = await axios.get(`${Url}/blog/single-blog/${blogId}`)  

//         if(responseData !== null && responseData !== undefined) {  
//             const {title, slug, imageAlt, shortDescription, description, image } = responseData.data
//             setEditorHtml(description)
//             setFormValue({title, slug, imageAlt, shortDescription,})
//             setOldImage(image)   
//         }
//         else{
//             console.log("responseData is false or error");
//         }
//     }; 

//   useEffect(()=>{
//     getBlogFunc()
//   }, [])
    




//   return (
//     <>
//     <ToastContainer />
//     <Helmet>
//         <title> Teamlans | Blog </title>
//     </Helmet> 
//     <Container className='card bg-white rounded border p-3'>
//       <section>
//         <form className="form">
//           <div className="row">

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Title</label>
//                 <input type="text" name="title" placeholder='title' value={formValue.title} className='form-control' onChange={e=>formHandle(e)} />
//               </div>
//             </div> 

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Slug</label>
//                 <input type="text" name="slug" placeholder='slug' value={formValue.slug} className='form-control' onChange={e=>formHandle(e)} />
//               </div>
//             </div> 

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Image</label>
//                 <input type="file" name="blogImage"  className='form-control'  onChange={e=>fileHandle(e)} />
//               </div>
//               <div className="d-flex gap-3 py-2">
//                 <img src={`${oldImage}`} alt={formValue.imageAlt} style={{width : "50px"}} /> 
//               </div>
//             </div> 

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Image Alt </label>
//                 <input type="text" name="imageAlt" value={formValue.imageAlt} placeholder='Enter the Image Alt' className='form-control  '  onChange={e=>formHandle(e)} />
//               </div>
//             </div> 

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Short Description </label>
//                 <textarea type="text" name="shortDescription" value={formValue.shortDescription} placeholder='short Description' className='form-control w-100 '  onChange={e=>formHandle(e)} />
//               </div>
//             </div> 
               
  
  
//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="" className='mb-1'>Description </label>   
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





// export default UpdateBlog








// import React, {useEffect, useState} from 'react'
// import { Helmet } from 'react-helmet-async';  
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';

// import { Url } from '../url/url';
// import { Container } from '@mui/material';
// import axios from "axios"; 
// import { useNavigate, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { blogdata } from 'src/redux/slice/blog';
// import { useDispatch } from 'react-redux';

// const UpdateBlog = () => {  

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const {blogId} = useParams()

//   const [loading, setLoading] = useState(false) 
//   const [formValue, setFormValue] = useState({ category: "" })  
//   const [fileValue, setFileValue] = useState({})
//   const [editorHtml, setEditorHtml] = useState('');
//   const [oldImage, setOldImage] = useState('');

//   const handleEditorChange = (descriptionHtml) => { 
//     setEditorHtml(descriptionHtml);
//   }

//   const formHandle = (e)=>{
//     const key = e.target.name
//     const value = e.target.value 

//     // category lower-case mat karo
//     if(key === "category"){
//       setFormValue({...formValue, [key]: value})
//     } else {
//       setFormValue({...formValue, [key]: value.toLowerCase()})
//     }
//   }

//   const fileHandle = (e)=>{
//     const file = e.target.files[0]
//     const name = e.target.name
//     setFileValue({...fileValue, [name]:file})
//   }

//   const submit = async(e)=>{
//     e.preventDefault() 
//     setLoading(true)   

//     const {title, shortDescription, imageAlt, slug, category} = formValue 

//     if(title && shortDescription && imageAlt && slug && category){   
    
//       try { 
//         const formData = new FormData() 
//         formData.append("title", formValue.title)  
//         formData.append("slug", formValue.slug) 
//         formData.append("imageAlt", formValue.imageAlt) 
//         formData.append("shortDescription", formValue.shortDescription)  
//         formData.append("description", editorHtml)   
//         formData.append("category", formValue.category)

//         if (fileValue.blogImage) { 
//           formData.append("blogImage", fileValue.blogImage)   
//         }

//         formData.append("oldImage", oldImage)    

//         await axios.post(`${Url}/blog/update/${blogId}`, formData)  
//         await dispatch(blogdata()) 
//         setLoading(false)

//         Swal.fire({
//           position: 'top-end',
//           icon: 'success',
//           title: 'Blog Updated Successfully',
//           showConfirmButton: false,
//           timer: 1500
//         })

//         navigate('/dashboard/blog') 

//       } catch (error) {
//         console.log(error);
//         setLoading(false)
//         toast.error("something went wrong");
//       }  

//     } else {
//       setLoading(false) 
//       toast.error("All fields are required");
//     }
//   }
 
//   const getBlogFunc = async () => {  
//     const responseData = await axios.get(`${Url}/blog/single-blog/${blogId}`)  

//     if(responseData) {  
//       const {
//         title, slug, imageAlt, shortDescription, 
//         description, image, category
//       } = responseData.data

//       setEditorHtml(description)

//       setFormValue({
//         title,
//         slug,
//         imageAlt,
//         shortDescription,
//         category      // ⭐ NEW
//       })

//       setOldImage(image)   
//     }
//   }; 

//   useEffect(()=>{
//     getBlogFunc()
//   }, [])
    
//   return (
//     <>
//     <ToastContainer />
//     <Helmet>
//         <title> Teamlans | Update Blog </title>
//     </Helmet> 

//     <Container className='card bg-white rounded border p-3'>
//       <section>
//         <form className="form">
//           <div className="row">

//             {/* CATEGORY FIELD */}
//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label>Category</label>
//                 <select 
//                   name="category"
//                   value={formValue.category}
//                   className="form-control"
//                   onChange={formHandle}
//                 >
//                   <option value="">-- Select Category --</option>
//                   <option value="guides">Guides</option>
//                   <option value="Latest">Latest</option>

//                   <option value="news and update">News and Update</option>
//                   <option value="blogs">Blogs</option>
//                 </select>
//               </div>
//             </div>

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label>Title</label>
//                 <input 
//                   type="text" 
//                   name="title" 
//                   placeholder='title'
//                   value={formValue.title}
//                   className='form-control'
//                   onChange={formHandle} 
//                 />
//               </div>
//             </div> 

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label>Slug</label>
//                 <input 
//                   type="text" 
//                   name="slug" 
//                   placeholder='slug'
//                   value={formValue.slug}
//                   className='form-control'
//                   onChange={formHandle} 
//                 />
//               </div>
//             </div> 

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label>Image</label>
//                 <input 
//                   type="file" 
//                   name="blogImage"
//                   className='form-control'
//                   onChange={fileHandle}
//                 />
//               </div>
//               <div className="d-flex gap-3 py-2">
//                 <img 
//                   src={oldImage} 
//                   alt={formValue.imageAlt} 
//                   style={{width : "60px", borderRadius:"4px"}} 
//                 /> 
//               </div>
//             </div> 

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label>Image Alt</label>
//                 <input 
//                   type="text" 
//                   name="imageAlt"
//                   value={formValue.imageAlt}
//                   placeholder='Enter the Image Alt'
//                   className='form-control'
//                   onChange={formHandle} 
//                 />
//               </div>
//             </div> 

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label>Short Description</label>
//                 <textarea 
//                   name="shortDescription"
//                   value={formValue.shortDescription}
//                   placeholder='short Description'
//                   className='form-control w-100'
//                   onChange={formHandle}
//                 />
//               </div>
//             </div>

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label>Description</label>
//                 <ReactQuill
//                   value={editorHtml}
//                   onChange={handleEditorChange}
//                   placeholder="Write something..."
//                 />
//               </div>
//             </div> 

//             <div className="col-12 mb-2">
//               <button 
//                 type='submit' 
//                 onClick={submit} 
//                 disabled={loading} 
//                 className='btn btn-primary border shadow'
//               >
//                 {loading ? "Updating..." : "Update"}
//               </button>
//             </div>

//           </div> 
//         </form>
//       </section>
//     </Container> 
//     </>
//   )
// }

// export default UpdateBlog
















import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Container } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { blogdata } from 'src/redux/slice/blog';
import { Url } from '../url/url';

// ✅ FIX: Har field ko empty string se initialize karo
// Yahi root cause tha — undefined value = uncontrolled input
// Data fetch hone ke baad value set hoti thi = controlled
// React yeh transition allow nahi karta
const INITIAL_FORM = {
  title:            '',
  slug:             '',
  imageAlt:         '',
  shortDescription: '',
  category:         '',
};

const CATEGORIES = [
  { value: 'guides',         label: 'Guides' },
  { value: 'Latest',         label: 'Latest' },
  { value: 'news and update', label: 'News and Update' },
  { value: 'blogs',          label: 'Blogs' },
];

const UpdateBlog = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { blogId } = useParams();

  const [loading,     setLoading]     = useState(false);
  const [fetching,    setFetching]    = useState(true);   // initial load state
  const [formValue,   setFormValue]   = useState(INITIAL_FORM);  // ✅ all fields initialized
  const [fileValue,   setFileValue]   = useState({});
  const [editorHtml,  setEditorHtml]  = useState('');
  const [oldImage,    setOldImage]    = useState('');

  // ── Handlers ──────────────────────────────────────────────────────────────
  const formHandle = (e) => {
    const { name, value } = e.target;
    // category aur Latest = mixed case, baaki sab lowercase
    const normalised = name === 'category' ? value : value.toLowerCase();
    setFormValue(prev => ({ ...prev, [name]: normalised }));
  };

  const fileHandle = (e) => {
    const { name, files } = e.target;
    setFileValue(prev => ({ ...prev, [name]: files[0] }));
  };

  // ── Fetch existing blog ───────────────────────────────────────────────────
  const getBlogFunc = useCallback(async () => {
    setFetching(true);
    try {
      const { data } = await axios.get(`${Url}/blog/single-blog/${blogId}`);
      if (data) {
        const { title, slug, imageAlt, shortDescription, description, image, category } = data;
        setEditorHtml(description || '');
        setOldImage(image || '');
        // ✅ Spread over INITIAL_FORM so no field is ever undefined
        setFormValue({
          ...INITIAL_FORM,
          title:            title            || '',
          slug:             slug             || '',
          imageAlt:         imageAlt         || '',
          shortDescription: shortDescription || '',
          category:         category         || '',
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load blog data');
    } finally {
      setFetching(false);
    }
  }, [blogId]);

  useEffect(() => { getBlogFunc(); }, [getBlogFunc]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const submit = async (e) => {
    e.preventDefault();
    const { title, shortDescription, imageAlt, slug, category } = formValue;

    if (!title || !shortDescription || !imageAlt || !slug || !category) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title',            formValue.title);
      formData.append('slug',             formValue.slug);
      formData.append('imageAlt',         formValue.imageAlt);
      formData.append('shortDescription', formValue.shortDescription);
      formData.append('description',      editorHtml);
      formData.append('category',         formValue.category);
      formData.append('oldImage',         oldImage);
      if (fileValue.blogImage) formData.append('blogImage', fileValue.blogImage);

      await axios.post(`${Url}/blog/update/${blogId}`, formData);
      await dispatch(blogdata());

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Blog Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/dashboard/blog');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (fetching) return (
    <Container className="card bg-white rounded border p-4 text-center">
      <span className="text-muted">Loading blog data…</span>
    </Container>
  );

  return (
    <>
      <ToastContainer />
      <Helmet><title>Teamlans | Update Blog</title></Helmet>

      <Container className="card bg-white rounded border p-3">
        <section>
          <form onSubmit={submit}>
            <div className="row">

              {/* Category */}
              <div className="col-12 mb-3">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formValue.category}   // ✅ always a string, never undefined
                    className="form-control"
                    onChange={formHandle}
                  >
                    <option value="">-- Select Category --</option>
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div className="col-12 mb-3">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formValue.title}       // ✅ always a string
                    className="form-control"
                    onChange={formHandle}
                  />
                </div>
              </div>

              {/* Slug */}
              <div className="col-12 mb-3">
                <div className="form-group">
                  <label>Slug</label>
                  <input
                    type="text"
                    name="slug"
                    placeholder="slug"
                    value={formValue.slug}        // ✅ always a string
                    className="form-control"
                    onChange={formHandle}
                  />
                </div>
              </div>

              {/* Image + Alt */}
              <div className="col-lg-6 col-md-6 col-12 mb-3">
                <div className="form-group">
                  <label>Image</label>
                  <input
                    type="file"
                    name="blogImage"
                    className="form-control"
                    onChange={fileHandle}
                    accept="image/*"
                  />
                </div>
                {oldImage && (
                  <div className="d-flex gap-3 py-2">
                    <img
                      // src={oldImage}
            src={`https://s3.ap-south-1.amazonaws.com/bucket.gigbig/${oldImage}`}

                      alt={formValue.imageAlt}
                      style={{ width: 60, borderRadius: 4, objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-12 mb-3">
                <div className="form-group">
                  <label>Image Alt</label>
                  <input
                    type="text"
                    name="imageAlt"
                    placeholder="Enter image alt text"
                    value={formValue.imageAlt}    // ✅ always a string
                    className="form-control"
                    onChange={formHandle}
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="col-12 mb-3">
                <div className="form-group">
                  <label>Short Description</label>
                  <textarea
                    name="shortDescription"
                    placeholder="Short description"
                    value={formValue.shortDescription}  // ✅ always a string
                    className="form-control w-100"
                    rows={3}
                    onChange={formHandle}
                  />
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="col-12 mb-3">
                <div className="form-group">
                  <label>Description</label>
                  <ReactQuill
                    value={editorHtml}
                    onChange={setEditorHtml}
                    placeholder="Write something..."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="col-12 mb-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary border shadow"
                >
                  {loading ? 'Updating…' : 'Update Blog'}
                </button>
              </div>

            </div>
          </form>
        </section>
      </Container>
    </>
  );
};

export default UpdateBlog;
