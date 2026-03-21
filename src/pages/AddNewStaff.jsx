// import React, {useState} from 'react'
// import { Helmet } from 'react-helmet-async';  
// import {useDispatch, useSelector} from 'react-redux'
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';


// import { Url } from '../url/url';
// import { Container } from '@mui/material';
// import axios from "axios";
// import { packagedata } from '../redux/slice/package'
// import { useNavigate } from 'react-router-dom';
// import { staffdata } from 'src/redux/slice/staff';


// const AddNewStaff = () => {  
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false) 
//   const [formData, setFormData] = useState({}) 
//   const roleAllData = useSelector(store => store.role.data)
 
//   const formHandle = (e)=>{
//     const key = e.target.name
//     const value = e.target.value 
//     setFormData({...formData, [key]:value}) 
//   }

//   const submit = async(e)=>{
//     e.preventDefault()
//     setLoading(true)   
//     try { 
//       await axios.post(`${Url}/staff/add`, {...formData, "contact": {email:formData.email, skype: formData.skype}})
//       dispatch(staffdata())
//       toast.success("New Staff Added"); 
//       setLoading(false)
//       navigate('/dashboard/staff') 
//     } catch (error) {
//       console.log(error);
//       setLoading(false)
//     } 
//   }




//   return (
//     <>
//     <ToastContainer />
//     <Helmet>
//         <title> Teamlans | Package </title>
//     </Helmet> 
//     <Container className='card bg-white rounded border p-3'>
//       <section>
//         <form className="form">
//           <div className="row">
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">Name</label>
//                 <input type="text" name="name" placeholder='Enter Name' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)} />
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">email  (&#x24;) </label>
//                 <input type="text" name="email" placeholder='email' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-2">
//               <div className="form-group">
//                 <label htmlFor="">role </label>
//                 <select name="role" id="" className='form-control addpackageinput' onChange={e=>formHandle(e)}>
//                     <option value="" disabled={formData.role}>Choose Role</option>
//                     {roleAllData && roleAllData.map((roleValue, roleIndex)=>{
//                         return(
//                             <option value={roleValue.role} key={roleIndex}>{roleValue.role}</option>
//                         )
//                     })}
//                 </select>
//               </div>
//             </div>
//             <div className="col-lg-6 col-md-6 col-12 mb-3">
//               <div className="form-group">
//                 <label htmlFor="">Password</label>
//                 <input type="password" name="password" placeholder='password' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
//               </div>
//             </div>  

//             <div className="col-12 mb-2">
//               <button type='submit' onClick={e=>submit(e)} className='btn btn-primary border shadow '>{loading ? <>  Adding...</> : <> Add </>}</button>
//             </div>


 
//           </div> 
//         </form>
//       </section>
//     </Container> 
//     </>
//   )
// }





// export default AddNewStaff











import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';  
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Url } from '../url/url';
import { Container } from '@mui/material';
import axios from "axios";
import { staffdata } from 'src/redux/slice/staff';
import { useNavigate } from 'react-router-dom';

const AddNewStaff = () => {  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) 
  const [formData, setFormData] = useState({}) 
  const roleAllData = useSelector(store => store.role.data)
 
  const formHandle = (e) => {
    const key = e.target.name
    const value = e.target.value 
    setFormData({ ...formData, [key]: value }) 
  }

  const submit = async(e) => {
    e.preventDefault()
    setLoading(true)   
    try { 
      await axios.post(`${Url}/staff/add`, {
        ...formData,
        contact: { email: formData.email, skype: formData.skype },
        source: "Internal"  
      })
      dispatch(staffdata())
      toast.success("New Staff Added"); 
      setLoading(false)
      navigate('/dashboard/staff') 
    } catch (error) {
      console.log(error);
      setLoading(false)
    } 
  }

  return (
    <>
      <ToastContainer />
      <Helmet>
        <title> GiG BIG | Add Staff </title>
      </Helmet> 
      <Container className='card bg-white rounded border p-3'>
        <section>
          <form className="form">
            <div className="row">
              {/* ✅ First Name */}
              <div className="col-lg-6 col-md-6 col-12 mb-2">
                <div className="form-group">
                  <label htmlFor="">First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder='Enter First Name' 
                    className='form-control addpackageinput' 
                    onChange={formHandle} 
                  />
                </div>
              </div>

              {/* ✅ Last Name */}
              <div className="col-lg-6 col-md-6 col-12 mb-2">
                <div className="form-group">
                  <label htmlFor="">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder='Enter Last Name' 
                    className='form-control addpackageinput' 
                    onChange={formHandle} 
                  />
                </div>
              </div>

              {/* ✅ Email */}
              <div className="col-lg-6 col-md-6 col-12 mb-2">
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder='Email' 
                    className='form-control addpackageinput' 
                    onChange={formHandle}
                  />
                </div>
              </div>

              {/* ✅ Role */}
              <div className="col-lg-6 col-md-6 col-12 mb-2">
                <div className="form-group">
                  <label htmlFor="">Role</label>
                  <select 
                    name="role" 
                    className='form-control addpackageinput' 
                    onChange={formHandle}
                  >
                    <option value="">Choose Role</option>
                    {roleAllData && roleAllData.map((roleValue, roleIndex) => (
                      <option value={roleValue.role} key={roleIndex}>{roleValue.role}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ✅ Password */}
              <div className="col-lg-6 col-md-6 col-12 mb-3">
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    className='form-control addpackageinput' 
                    onChange={formHandle}
                  />
                </div>
              </div>  

              <div className="col-12 mb-2">
                <button 
                  type='submit' 
                  onClick={submit} 
                  className='btn btn-primary border shadow '
                >
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

export default AddNewStaff
