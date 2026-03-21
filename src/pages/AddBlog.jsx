// import React, {useState} from 'react'
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
// import { blogdata } from 'src/redux/slice/blog';

 
// const AddBlog = () => {  
//     const allCategory = useSelector(store => store.category.data) 
//     const allPackage = useSelector(store => store.package.data) 
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false) 
//   const [formValue, setFormValue] = useState({}) 
//   const [categoryArr, setCategoryArr] = useState([])
//   const [packageArr, setPackageArr] = useState([]) 
//   const [fileValue, setFileValue] = useState()
//   const [editorHtml, setEditorHtml] = useState('');

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
//       formData.append("blogImage", fileValue.blogImage)   

//       await axios.post(`${Url}/blog/add`, formData)  
//       await dispatch(blogdata()) 
//       setLoading(false)
//       Swal.fire({
//         position: 'top-end',
//         icon: 'success',
//         title: 'New Service Added',
//         showConfirmButton: false,
//         timer: 1500
//       })
//       navigate('/dashboard/blog') 

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
//                 <input type="text" name="title" placeholder='title' className='form-control' onChange={e=>formHandle(e)} />
//               </div>
//             </div> 

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Slug</label>
//                 <input type="text" name="slug" placeholder='slug' className='form-control' onChange={e=>formHandle(e)} />
//               </div>
//             </div> 

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Image</label>
//                 <input type="file" name="blogImage"  className='form-control' onChange={e=>fileHandle(e)} />
//               </div>
//             </div> 

//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Image Alt </label>
//                 <input type="text" name="imageAlt" placeholder='Enter the Image Alt' className='form-control  '  onChange={e=>formHandle(e)} />
//               </div>
//             </div> 

//             <div className=" col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Short Description </label>
//                 <textarea type="text" name="shortDescription" placeholder='short Description' className='form-control w-100 '  onChange={e=>formHandle(e)} />
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





// export default AddBlog



import React, {useState} from 'react'
import { Helmet } from 'react-helmet-async';  
import {useDispatch, useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import { Url } from '../url/url';
import { Container } from '@mui/material';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { blogdata } from 'src/redux/slice/blog';

const AddBlog = () => {  

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) 
  const [formValue, setFormValue] = useState({ category : "" }) 
  const [fileValue, setFileValue] = useState()
  const [editorHtml, setEditorHtml] = useState('');

  const handleEditorChange = (descriptionHtml) => { 
    setEditorHtml(descriptionHtml);
  }

  const formHandle = (e)=>{
    const key = e.target.name
    const value = e.target.value 

    // category lower-case nahi karenge
    if(key === "category"){
      setFormValue({...formValue, [key]:value})
    } else {
      setFormValue({...formValue, [key]:value.toLowerCase()}) 
    }
  }

  const fileHandle = (e)=>{
    const file = e.target.files[0]
    const name = e.target.name
    setFileValue({...fileValue, [name]:file})
  }

  const submit = async(e)=>{
    e.preventDefault() 
    setLoading(true)   
    const {title, shortDescription, imageAlt, slug, category} = formValue 

    if(title && shortDescription && imageAlt && slug && category){   
    
      try { 
        const formData = new FormData() 
        formData.append("title", formValue.title)  
        formData.append("slug", formValue.slug) 
        formData.append("imageAlt", formValue.imageAlt) 
        formData.append("shortDescription", formValue.shortDescription)  
        formData.append("description", editorHtml)     
        formData.append("blogImage", fileValue?.blogImage)   
        formData.append("category", formValue.category)

        await axios.post(`${Url}/blog/add`, formData)  
        await dispatch(blogdata()) 

        setLoading(false)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'New Blog Added',
          showConfirmButton: false,
          timer: 1500
        })

        navigate('/dashboard/blog') 

      } catch (error) {
        console.log(error);
        setLoading(false)
        toast.error("Something went wrong");
      }  

    } else {
        setLoading(false) 
        toast.error("All fields are required");
    }

  }

  return (
    <>
    <ToastContainer />
    <Helmet>
        <title> Teamlans | Blog </title>
    </Helmet> 

    <Container className='card bg-white rounded border p-3'>
      <section>
        <form className="form">
          <div className="row">

            {/* CATEGORY FIELD */}
            <div className=" col-12 mb-3">
              <div className="form-group">
                <label>Category</label>
                <select 
                  name="category"
                  className="form-control"
                  onChange={formHandle}
                >
                  <option value="">-- Select Category --</option>
                  <option value="guides">Guides</option>
                  <option value="Events">Events</option>
                  <option value="Latest">Latest</option>
                  <option value="news and update">News and Update</option>
                  <option value="blogs">Blogs</option>
                </select>
              </div>
            </div>

            <div className=" col-12 mb-3">
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" placeholder='Title' className='form-control' onChange={formHandle} />
              </div>
            </div> 

            <div className=" col-12 mb-3">
              <div className="form-group">
                <label>Slug</label>
                <input type="text" name="slug" placeholder='slug' className='form-control' onChange={formHandle} />
              </div>
            </div> 

            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Image</label>
                <input type="file" name="blogImage" className='form-control' onChange={fileHandle} />
              </div>
            </div> 

            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label>Image Alt</label>
                <input type="text" name="imageAlt" placeholder='Enter image alt text' className='form-control' onChange={formHandle} />
              </div>
            </div> 

            <div className=" col-12 mb-3">
              <div className="form-group">
                <label>Short Description</label>
                <textarea name="shortDescription" placeholder='Short description...' className='form-control' onChange={formHandle}></textarea>
              </div>
            </div>

            <div className=" col-12 mb-3">
              <div className="form-group">
                <label>Description</label>
                <ReactQuill value={editorHtml} onChange={handleEditorChange} placeholder="Write something..." />
              </div>
            </div> 

            <div className="col-12 mb-2">
              <button type='submit' onClick={submit} disabled={loading} className='btn btn-primary border shadow'>
                {loading ? "Adding..." : "Add"}
              </button>
            </div>

          </div> 
        </form>
      </section>
    </Container> 
    </>
  )
}

export default AddBlog
