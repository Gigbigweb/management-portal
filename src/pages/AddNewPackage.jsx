import React, {useState} from 'react'
import { Helmet } from 'react-helmet-async';  
import {useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


import { Url } from '../url/url';
import { Container } from '@mui/material';
import axios from "axios";
import { packagedata } from '../redux/slice/package'
import { useNavigate } from 'react-router-dom';


const AddNewPackage = () => {  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) 
  const [formData, setFormData] = useState({}) 
 
  const formHandle = (e)=>{
    const key = e.target.name
    const value = e.target.value 
    setFormData({...formData, [key]:value}) 
  }

  const submit = async(e)=>{
    e.preventDefault()
    setLoading(true)   
    try { 
      await axios.post(`${Url}/package/add`, formData)
      dispatch(packagedata())
      toast.success("New Package Added"); 
      setLoading(false)
      navigate('/dashboard/package') 
    } catch (error) {
      console.log(error);
      setLoading(false)
    } 
  }




  return (
    <>
    <ToastContainer />
    <Helmet>
        <title> Teamlans | Package </title>
    </Helmet> 
    <Container className='card bg-white rounded border p-3'>
      <section>
        <form className="form">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="">Package Name</label>
                <input type="text" name="packageName" placeholder='Enter the Package Name' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)} />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="">Price  (&#x24;) </label>
                <input type="text" name="price" placeholder='Price' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="">Discount Price ($)</label>
                <input type="text" name="discountPrice" placeholder='Discount Price' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label htmlFor="">Extra Offer (%)</label>
                <input type="text" name="offer" placeholder='Offer' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
              </div>
            </div> 
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label htmlFor="">Total Service</label>
                <input type="number" name="totalService" placeholder='Total Service' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
              </div>
            </div>  
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label htmlFor="">Service Days</label>
                <input type="number" name="days" placeholder='service days' className='form-control addpackageinput' id="" onChange={e=>formHandle(e)}/>
              </div>
            </div>  

            <div className=" col-12 mb-3">
              <div className="form-group">
                <label htmlFor="" className='mb-1'>About Package</label>   
                <textarea name="description"   onChange={e=>formHandle(e)} className='form-control' placeholder='write something about package' rows="4"></textarea> 
              </div>
            </div> 

            <div className="col-12 mb-2">
              <button type='submit' onClick={e=>submit(e)} className='btn btn-primary border shadow '>{loading ? <>  Adding...</> : <> Add </>}</button>
            </div>


 
          </div> 
        </form>
      </section>
    </Container> 
    </>
  )
}





export default AddNewPackage