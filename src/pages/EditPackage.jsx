import React, {useEffect, useState} from 'react'
import { Helmet } from 'react-helmet-async';  


import { Url } from '../url/url';
import { Container } from '@mui/material';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { packagedata } from '../redux/slice/package'
import { useNavigate } from 'react-router-dom';



import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const UpdatePackage = () => {  

    const {id} = useParams()  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState()
    const [loading , setLoading] = useState(false) 


    const packageFunc = async(id)=>{
        let data = await axios.get(`${Url}/package/single-package/${id}`)
        data = data.data
        const dataValue = data[0] 
        setFormData(dataValue) 
    }  
    const formHandle = (e)=>{
        const key = e.target.name
        const value = (e.target.value).toLowerCase()  
        setFormData({...formData, [key]:value}) 
    }

    const submit = async(e)=>{
      e.preventDefault()  
      setLoading(true)
      const newDataObj = {...formData}
      try { 
        await axios.put(`${Url}/package/update/${id}`, newDataObj)
        dispatch(packagedata())
        setLoading(false)
        toast.success("Package Updated Successfully"); 
        navigate('/dashboard/package')
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
      setLoading(false)
    }



  useEffect(()=>{
    packageFunc(id)
  }, [])


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
                <input type="text" name="packageName" placeholder='Enter the Package Name' className='form-control addpackageinput'  value={formData && formData.packageName} onChange={e=>formHandle(e)} />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="">Price  (&#x24;) </label>
                <input type="text" name="price" placeholder='Price' className='form-control addpackageinput' id="" value={formData && formData.price} onChange={e=>formHandle(e)}/>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-2">
              <div className="form-group">
                <label htmlFor="">Discount Price Price  (&#x24;)</label>
                <input type="text" name="discountPrice" placeholder='Discount Price' className='form-control addpackageinput' id="" value={formData && formData.discountPrice} onChange={e=>formHandle(e)}/>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label htmlFor="">Extra Offer (%)</label>
                <input type="text" name="offer" placeholder='Offer' className='form-control addpackageinput' id="" value={formData && formData.offer} onChange={e=>formHandle(e)}/>
              </div>
            </div> 
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label htmlFor="">Total Service</label>
                <input type="number" name="totalService" placeholder='Offer' className='form-control addpackageinput' id="" value={formData && formData.totalService} onChange={e=>formHandle(e)}/>
              </div>
            </div> 
            <div className="col-lg-6 col-md-6 col-12 mb-3">
              <div className="form-group">
                <label htmlFor="">service days</label>
                <input type="number" name="days" placeholder='servie days' className='form-control addpackageinput' id="" value={formData && formData.days} onChange={e=>formHandle(e)}/>
              </div>
            </div> 
 
            <div className=" col-12 mb-3">
              <div className="form-group">
                <label htmlFor="" className='mb-1'>Package Description</label>   
                <textarea name="description" id=""  value={formData && formData.description} onChange={e=>formHandle(e)} className='form-control' placeholder='write something about package' rows="4"></textarea> 
              </div>
            </div> 
     



            <div className="col-12 mb-2">
              <button type='submit' onClick={e=>submit(e)} className='btn btn-primary border shadow '> {loading ? <>Updating...</> : <>Update</>}</button>
            </div>


 
          </div> 
        </form>
      </section>
    </Container> 
    </>
  )
}

export default UpdatePackage